import { useThemeContext } from "@/src/contexts/ThemeContext";
import i18n from "@/src/utils/i18n";
import { supabase } from "@/src/utils/supabase";
import { themeColors } from "@/src/utils/theme";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, TouchableOpacity, View, TextInput, StyleSheet } from "react-native";
import { Button, Text, themeColor } from "react-native-rapi-ui";

export default function () {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useThemeContext();

  async function forget() {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setLoading(false);
      console.error(error);
      alert(error.message);
    } else {
      setLoading(false);
      Alert.alert(`${i18n.t("password_reset_instructions")}`);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        // marginTop: 80,
      }}
      scrollEnabled={false}
    >
      <View
        style={{
          flex: 2,
          paddingHorizontal: 20,
          paddingBottom: 300,
          backgroundColor: theme === "dark" ? themeColors.dark.background : themeColors.light.background,
        }}
      >
        <Text
          fontWeight="bold"
          size="h3"
          style={{
            alignSelf: "center",
            padding: 30,
            color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText,
          }}
        >
          {i18n.t("forget_password")}
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme === "dark" ? themeColors.dark.background : themeColors.light.background,
              borderColor: theme === "dark" ? themeColors.dark.border : themeColors.light.border,
              color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText,
            },
          ]}
          placeholder={i18n.t("registered_email")}
          placeholderTextColor={theme === "dark" ? undefined : "#999"}
          value={email}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <Button
          text={loading ? "Loading" : i18n.t("send_email")}
          onPress={() => {
            forget();
          }}
          style={{
            marginTop: 20,
          }}
          disabled={loading}
          textStyle={{ marginVertical: 3 }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
            justifyContent: "center",
          }}
        >
          <Text size="md" style={{ color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText }}>
            {i18n.t("already_have_account")}
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.replace("/settings/(auth)/login");
            }}
          >
            <Text
              size="md"
              fontWeight="bold"
              style={{
                marginLeft: 5,
                color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText,
              }}
            >
              {i18n.t("loginHere")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
});
