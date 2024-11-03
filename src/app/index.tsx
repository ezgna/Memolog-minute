import { Entry } from "@/types";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Toast from "react-native-root-toast";
import CancelEditButton from "../components/CancelEditButton";
import { FlashListCompo } from "../components/FlashListCompo";
import SaveButton from "../components/SaveButton";
import { useAuthContext } from "../contexts/AuthContext";
import { useDataContext } from "../contexts/DataContext";
import { useDatabase } from "../hooks/useDatabase";
import { supabase } from "../utils/supabase";
import { fetchSupabaseData, updateLocalUserIdToUid, updateUnsyncedLocalDataWithSupabase } from "../utils/sync";
import CryptoES from "crypto-es";
import { jsonFormatter } from "../utils/encryption";
import ResetDatabase from "../utils/resetDatabase";
import { useThemeContext } from "../contexts/ThemeContext";
import { themeColors } from "../utils/theme";
import * as Crypto from 'expo-crypto';

export default function index() {
  const db = useDatabase();
  const [text, setText] = useState<string>("");
  const { session, isOnline, isProUser } = useAuthContext();
  const userId = session?.user.id || null;
  const { dataUpdated, setDataUpdated, searchQuery } = useDataContext();
  const [fetchedEntries, setFetchedEntries] = useState<Entry[]>([]);
  const { theme } = useThemeContext();

  const createTable = async () => {
    if (!db) return;
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS entries (
          id TEXT PRIMARY KEY,
          created_at TEXT,
          updated_at TEXT,
          deleted_at TEXT,
          date TEXT,
          text TEXT,
          user_id TEXT,
          synced INTEGER DEFAULT 0
        );
        CREATE INDEX IF NOT EXISTS idx_date ON entries (date);
      `);
    } catch (e) {
      console.error(e);
    }
  };

  const storeEntry = async (text: string) => {
    if (!db) return;
    if (!text.trim()) {
      setText("");
      Toast.show("Content cannot be empty");
      return;
    }
    const localizedDateString = new Date().toLocaleDateString().replace(/\//g, "-");
    const data = {
      id: Crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      date: localizedDateString,
      text: text.trim(),
      user_id: userId,
    };
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync(`INSERT INTO entries (id, created_at, updated_at, deleted_at, date, text, user_id) VALUES (?,?,?,?,?,?,?)`, [
          data.id,
          data.created_at,
          data.updated_at,
          data.deleted_at,
          data.date,
          data.text,
          data.user_id,
        ]);
      });

      setText("");
      setDataUpdated(!dataUpdated);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteEntry = async (id: number) => {
    if (!db) return;
    try {
      const updateAt = new Date().toISOString();
      const deletedAt = new Date().toISOString();
      await db.runAsync("UPDATE entries SET updated_at = ?, deleted_at = ?, synced = 0 WHERE id = ?", [updateAt, deletedAt, id]);
      setDataUpdated(!dataUpdated);
    } catch (e) {
      console.error(e);
    }
  };

  const [editingText, setEditingText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleEdit = (text: string, id: number) => {
    setEditingId(id);
    setEditingText(text);
  };

  const updateEntry = async () => {
    if (!db) return;
    if (!editingText.trim()) {
      Toast.show("Content cannot be empty");
      return;
    }
    try {
      const updateAt = new Date().toISOString();
      const trimmedEditingText = editingText.trim();
      await db.runAsync(`UPDATE entries SET text = ?, updated_at = ?, synced = 0 WHERE id = ?`, [trimmedEditingText, updateAt, editingId]);
      setEditingId(null);
      setEditingText("");
      setDataUpdated(!dataUpdated);
    } catch (e) {
      console.error(e);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  useEffect(() => {
    createTable();
  }, [db]);

  useEffect(() => {
    updateLocalUserIdToUid(db, userId);
  }, [db, userId]);

  useEffect(() => {
    // Check isOnline if it will automatically change when network state change
    const sync = async () => {
      if (isOnline && isProUser) {
        try {
          const { data, error } = await supabase.from("users").select("master_key").eq("user_id", userId);
          if (error) {
            console.error(error);
          }
          if (!(data && data.length > 0)) return;
          const { master_key: encryptedMasterKey } = data[0];
          const password = await SecureStore.getItemAsync("password");
          if (!password) return;
          const decryptedMasterKey: string = CryptoES.AES.decrypt(encryptedMasterKey, password, {
            format: jsonFormatter,
          }).toString(CryptoES.enc.Utf8);
          await updateUnsyncedLocalDataWithSupabase(db, userId, decryptedMasterKey);
          await fetchSupabaseData(db, userId, decryptedMasterKey);
        } catch (e) {
          console.error(e);
        }
      }
    };
    sync();
  }, [db, userId, isOnline, isProUser]);

  // const inputRef = useRef<TextInput>(null);

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, []);

  useEffect(() => {
    if (!db) return;
    const fetchAllEntries = async () => {
      try {
        const entries: Entry[] = await db.getAllAsync("SELECT * FROM entries WHERE deleted_at IS NULL ORDER BY created_at DESC");
        setFetchedEntries(entries);
        // console.log(entries)
        if (searchQuery) {
          const searchedEntries = entries.filter((entry) => entry.text?.toLowerCase().includes(searchQuery.toLowerCase()));
          setFetchedEntries(searchedEntries);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchAllEntries();
  }, [db, dataUpdated, searchQuery]);

  return (
    <View style={[styles.container, { backgroundColor: theme === "dark" ? themeColors.dark.background : themeColors.light.background }]}>
      {/* <ResetDatabase /> */}
      <View>
        <TextInput
          style={[
            styles.input,
            {
              color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText,
              borderColor: theme === "dark" ? themeColors.dark.border : themeColors.light.border,
            },
          ]}
          // ref={inputRef}
          onChangeText={editingId ? setEditingText : setText}
          value={editingId ? editingText : text}
          multiline
        />
        <View>
          {editingId ? <CancelEditButton onPress={() => cancelEdit()} /> : null}
          <SaveButton onPress={editingId ? () => updateEntry() : () => storeEntry(text)} editingId={editingId} />
        </View>
      </View>
      <FlashListCompo data={fetchedEntries} onDelete={deleteEntry} onUpdate={handleEdit} editingId={editingId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 18,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 45,
  },
});
