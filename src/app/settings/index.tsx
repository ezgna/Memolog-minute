import PlatformBannerAd from "@/src/components/PlatformBannerAd";
import { useThemeContext } from "@/src/contexts/ThemeContext";
import { db } from "@/src/database/db";
import { Entry } from "@/src/database/types";
import { ExportGDrive, handleFileSelect, ImportGDrive } from "@/src/utils/GDriveUtils";
import i18n from "@/src/utils/i18n";
import { removeAds, restorePurchase } from "@/src/utils/removeAds";
import { themeColors } from "@/src/utils/theme";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Linking, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useDataContext } from "../../contexts/DataContext";
import { Foundation } from "@expo/vector-icons";

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
  const [files, setFiles] = useState<Files[] | null>(null);
  const { dataUpdated, setDataUpdated } = useDataContext();
  const { theme } = useThemeContext();
  const [isAdsRemoved, setIsAdsRemoved] = useState(false);

  useEffect(() => {
    const checkAdsStatus = async () => {
      const value = await AsyncStorage.getItem("isAdsRemoved");
      if (value === "true") {
        setIsAdsRemoved(true);
      }
    };
    checkAdsStatus();
  }, []);

  const data = [
    { id: 2, label: `${i18n.t("customization")}` },
    { id: 3, label: `${i18n.t("faq")}`, icon: "question" },
    { id: 4, label: `${i18n.t("privacy_policy")}`, icon: "link" },
    ...(Platform.OS === "ios" ? [{ id: 5, label: `${i18n.t("terms_of_use")}`, icon: "link" }] : []),
    { id: 6, label: `${i18n.t("export")}` },
    { id: 7, label: `${i18n.t("import")}` },
    ...(Platform.OS === "ios" ? [{ id: 8, label: `${i18n.t("remove_ads")}` }] : []),
    ...(Platform.OS === "ios" ? [{ id: 9, label: `${i18n.t("restore_purchase")}` }] : []),
  ];

  const handlePress = async (id: number) => {
    switch (id) {
      case 2:
        router.push("/settings/customization");
        break;
      case 3:
        router.push("/settings/faq");
        break;
      case 4:
        try {
          Alert.alert(i18n.t("external_link"), i18n.t("external_link_message"), [
            {
              text: i18n.t("cancel"),
              style: "cancel",
            },
            {
              text: i18n.t("continue"),
              onPress: async () => await Linking.openURL("https://www.ezgna.com/privacypolicy"),
            },
          ]);
        } catch (e) {
          console.error(e);
        }
        break;
      case 5:
        try {
          Alert.alert(i18n.t("external_link"), i18n.t("external_link_message"), [
            {
              text: i18n.t("cancel"),
              style: "cancel",
            },
            {
              text: i18n.t("continue"),
              onPress: async () =>
                await Linking.openURL("https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"),
            },
          ]);
        } catch (e) {
          console.error(e);
        }
        break;
      case 6:
        if (!db) {
          Alert.alert("database initialize error");
        } else {
          const exportedFileName = await ExportGDrive(db);
          if (exportedFileName) {
            Alert.alert(i18n.t("exportFinished", { fileName: exportedFileName }));
          }
        }
        break;
      case 7:
        const importedFiles = await ImportGDrive();
        if (importedFiles) {
          setFiles(importedFiles);
        }
        break;
      case 8:
        removeAds();
        break;
      case 9:
        restorePurchase();
        break;
    }
  };

  const restoreDatabase = async (dataList: Entry[]) => {
    try {
      if (!db) {
        Alert.alert("database initialize error");
      } else {
        const placeholders = dataList.map(() => "(?,?,?,?,?,?)").join(",");
        const values = dataList.reduce(
          (acc, data) =>
            acc.concat([data.id, data.created_at, data.updated_at, data.deleted_at, data.date, data.text]),
          [] as (string | number | null)[]
        );
        await db.withTransactionAsync(async () => {
          await db!.runAsync(
            `INSERT OR IGNORE INTO entries (id, created_at, updated_at, deleted_at, date, text) VALUES ${placeholders}`,
            values
          );
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
      <Pressable onPress={() => handlePress(item.id)} style={{ paddingLeft: 10 }}>
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
              {item.id === 2 ? (
                <MaterialCommunityIcons
                  name="wrench-outline"
                  size={24}
                  color={theme === "dark" ? themeColors.dark.secondaryText : themeColors.light.primaryText}
                />
              ) : item.id === 6 ? (
                <FontAwesome6
                  name="file-export"
                  size={22}
                  color={theme === "dark" ? themeColors.dark.secondaryText : themeColors.light.primaryText}
                  style={{ paddingLeft: 4 }}
                />
              ) : item.id === 7 ? (
                <FontAwesome6
                  name="file-import"
                  size={22}
                  color={theme === "dark" ? themeColors.dark.secondaryText : themeColors.light.primaryText}
                  style={{ paddingLeft: 1 }}
                />
              ) : item.id === 8 ? (
                <Feather
                  name="eye-off"
                  size={22}
                  color={theme === "dark" ? themeColors.dark.secondaryText : themeColors.light.primaryText}
                  style={{ paddingLeft: 3 }}
                />
              ) : item.id === 9 ? (
                <Foundation
                  name="refresh"
                  size={24}
                  color={theme === "dark" ? themeColors.dark.secondaryText : themeColors.light.primaryText}
                  style={{ paddingLeft: 4 }}
                />
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
                styles.label,
              ]}
            >
              {item.label}
            </Text>
          </View>
          <Entypo
            name="chevron-small-right"
            size={24}
            color={theme === "dark" ? themeColors.dark.secondaryText : themeColors.light.secondaryText}
          />
        </View>
      </Pressable>
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
              <Pressable onPress={() => handleFileSelectWithClear(item.id, item.name)} style={styles.file}>
                <MaterialCommunityIcons name="file-document" size={24} color="#4285F4" />
                <Text style={{ paddingLeft: 5 }}>{item.name}</Text>
              </Pressable>
            )}
            estimatedItemSize={15}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "silver" }} />}
          />
        </View>
      )
    );
  };

  // const segments = useSegments();

  // useEffect(() => {
  //   if (!session) {
  //     setFiles(null);
  //   }
  // }, [session, segments]);

  useEffect(() => {
    if (theme === "dark") {
      setStatusBarStyle("light");
    } else if (theme === "light") {
      setStatusBarStyle("dark");
    }
  }, [theme]);

  return (
    <>
      <View
        style={{
          flex: 1,
          padding: 30,
          backgroundColor: theme === "dark" ? themeColors.dark.background : themeColors.light.background,
        }}
      >
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={60}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "silver" }} />}
          ListFooterComponent={ListFooterComponent()}
        />
      </View>
      {!isAdsRemoved && <PlatformBannerAd />}
    </>
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
