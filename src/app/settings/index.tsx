import AppearanceSettings from "@/src/components/AppearanceSettings";
import { useAuthContext } from "@/src/contexts/AuthContext";
import { useThemeContext } from "@/src/contexts/ThemeContext";
import { useDatabase } from "@/src/hooks/useDatabase";
import { ExportGDrive, handleFileSelect, ImportGDrive } from "@/src/services/GDriveUtils";
import i18n, { isJapanese } from "@/src/utils/i18n";
import { themeColors } from "@/src/utils/theme";
import { Entry } from "@/types";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import { useDataContext } from "../../contexts/DataContext";

interface SettingsListType {
  id: number;
  label: string;
  icon?: any;
}

interface Files {
  name: string;
  id: string;
}

const SettingsScreen = () => {
  const db = useDatabase();
  const [files, setFiles] = useState<Files[] | null>(null);
  const { dataUpdated, setDataUpdated } = useDataContext();
  const { session } = useAuthContext();
  const { theme } = useThemeContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const data = [
    { id: 1, label: `${i18n.t("account")}` },
    { id: 2, label: `${i18n.t("theme")}` },
    { id: 3, label: `${i18n.t("faq")}`, icon: "question" },
    { id: 4, label: `${i18n.t("export")}`, icon: "export" },
    { id: 5, label: `${i18n.t("import")}`, icon: "import" },
  ];

  // Hide export and import button for paid user
  const handlePress = async (id: number) => {
    switch (id) {
      case 1:
        router.push("/settings/account");
        break;
      case 2:
        setIsModalVisible(true);
        break;
      case 3:
        router.push("/settings/faq");
        break;
      case 4:
        if (!db) {
          Alert.alert("database initialize error");
        } else {
          if (!session) {
            Toast.show("You have to signup before exporting", {
              position: Toast.positions.CENTER,
            });
            router.push("/settings/(auth)/register");
          } else {
            const exportedFileName = await ExportGDrive(db);
            if (exportedFileName) {
              Alert.alert(i18n.t("exportFinished", { fileName: exportedFileName }));
            }
          }
        }
        break;
      case 5:
        if (!session) {
          Toast.show("You have to login before importing", {
            position: Toast.positions.CENTER,
          });
          router.push("/settings/(auth)/login");
        } else {
          const importedFiles = await ImportGDrive();
          if (importedFiles) {
            setFiles(importedFiles);
          }
        }
        break;
    }
  };

  const restoreDatabase = async (dataList: Entry[]) => {
    try {
      if (!db) {
        Alert.alert("database initialize error");
      } else {
        const placeholders = dataList.map(() => "(?,?,?,?,?,?,?,?)").join(",");
        const values = dataList.reduce(
          (acc, data) => acc.concat([data.id, data.created_at, data.updated_at, data.deleted_at, data.date, data.text, data.user_id, 0]),
          [] as (string | number | null)[]
        );
        await db.withTransactionAsync(async () => {
          await db.runAsync(`INSERT INTO entries (id, created_at, updated_at, deleted_at, date, text, user_id, synced) VALUES ${placeholders}`, values);
        });
        setFiles(null);
        setDataUpdated(!dataUpdated);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileSelectWithClear = async (id: string, name: string) => {
    const importedDataList = await handleFileSelect(id);
    if (importedDataList) {
      restoreDatabase(importedDataList);
      Alert.alert(i18n.t("importFinished", { fileName: name }));
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: SettingsListType }) => (
      <TouchableOpacity onPress={() => handlePress(item.id)} style={{ paddingLeft: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 30 }}>
              {item.id === 1 ? (
                <Feather name="user" size={24} color={theme === "dark" ? themeColors.dark.secondaryText : themeColors.light.primaryText} />
              ) : item.id === 2 ? (
                <MaterialCommunityIcons name="theme-light-dark" size={24} color={theme === "dark" ? themeColors.dark.secondaryText : themeColors.light.primaryText} />
              ) : (
                <Fontisto
                  name={item.icon}
                  size={20}
                  color={theme === "dark" ? themeColors.dark.secondaryText : themeColors.light.primaryText}
                  style={{ paddingLeft: 4 }}
                />
              )}
            </View>
            <Text
              style={[
                { color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText },
                isJapanese ? [styles.label, { fontFamily: "NotoSansJP" }] : styles.label,
              ]}
            >
              {item.label}
            </Text>
          </View>
          <Entypo name="chevron-small-right" size={24} color={theme === "dark" ? themeColors.dark.secondaryText : themeColors.light.secondaryText} />
        </View>
      </TouchableOpacity>
    ),
    [handlePress]
  );

  const ListFooterComponent = () => {
    return (
      files && (
        <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: "silver", flex: 1 }}>
          <FlashList
            data={files}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleFileSelectWithClear(item.id, item.name)} style={styles.file}>
                <MaterialCommunityIcons name="file-document" size={24} color="#4285F4" />
                <Text style={{ paddingLeft: 5 }}>{item.name}</Text>
              </TouchableOpacity>
            )}
            estimatedItemSize={15}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "silver" }} />}
          />
        </View>
      )
    );
  };

  useEffect(() => {
    if (!session) {
      setFiles(null);
    }
  }, [session]);

  return (
    <View style={{ flex: 1, padding: 30, backgroundColor: theme === "dark" ? themeColors.dark.background : themeColors.light.background }}>
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={60}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "silver" }} />}
        ListFooterComponent={ListFooterComponent()}
      />
      <Modal visible={isModalVisible} transparent={true} onRequestClose={() => setIsModalVisible(false)} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <TouchableWithoutFeedback>
              <View style={{ height: "25%", backgroundColor: theme === "dark" ? themeColors.dark.background : themeColors.light.background }}>
                <AppearanceSettings />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  file: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
  },
});
