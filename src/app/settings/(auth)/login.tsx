import { useThemeContext } from "@/src/contexts/ThemeContext";
import i18n from "@/src/utils/i18n";
import { supabase } from "@/src/utils/supabase";
import { themeColors } from "@/src/utils/theme";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoES from "crypto-es";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native";
import Toast from "react-native-root-toast";

let email: string;

export default function () {
  const router = useRouter();
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  // const { message }: { message: string } = useLocalSearchParams();
  const [isNotConfirmed, setIsNotConfirmed] = useState(false);
  const { theme } = useThemeContext();
  const [error, setError] = useState<string>("");

  const isValidUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]{4,16}$/;
    return usernameRegex.test(username);
  };

  const login = async () => {
    try {
      setLoading(true);
      setError("");
      if (!identifier.includes("@")) {
        if (!isValidUsername(identifier)) {
          setError("Invalid username");
          return;
        }

        const { data: selectedEmail, error: selectEmailError } = await supabase.from("profiles").select("email").eq("username", identifier).single();
        if (selectEmailError) {
          if (selectEmailError.details === "The result contains 0 rows") {
            setError("incorrect_login_credentials");
            return;
          }
          console.error("unknown selectEmailError:", selectEmailError);
          return;
        }
        email = selectedEmail?.email;
      }
      const {
        error,
        data: { session },
      } = await supabase.auth.signInWithPassword({
        email: email || identifier,
        password: password,
      });
      if (error) {
        if (error.message === "Email not confirmed") {
          Alert.alert("Email not confirmed", i18n.t("email_not_verified"), [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Resend",
              style: "destructive",
              onPress: async () => {
                const { error } = await supabase.auth.signUp({
                  email: identifier,
                  password: password,
                  options: {
                    data: {
                      language: i18n.locale,
                    },
                    emailRedirectTo: "https://sites.google.com/view/memolog-minute/confirmation",
                  },
                });
                if (error) {
                  console.error("const { error } = await supabase.auth.signUp({", error);
                  return;
                }
                Toast.show(i18n.t("email_resent"), {
                  position: Toast.positions.CENTER,
                });
                setIsNotConfirmed(true);
              },
            },
          ]);
        } else if (error.message === "Invalid login credentials") {
          setError("incorrect_login_credentials");
          return;
        } else {
          console.error("Unknown Error:", error);
        }
        return;
      } else if (session) {
        setIdentifier("");
        setPassword("");
        router.back();
        Toast.show("you logged in!");
      } else {
        console.error("session not exist");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      email = "";
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        // marginTop: 30,
      }}
      scrollEnabled={false}
    >
      <View
        style={{
          flex: 2,
          paddingHorizontal: 20,
          // paddingBottom: 300,
          backgroundColor: theme === "dark" ? themeColors.dark.background : themeColors.light.background,
        }}
      >
        {isNotConfirmed && (
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
            <AntDesign name="exclamationcircleo" size={25} color="red" style={{ paddingRight: 15 }} />
            <Text style={{ paddingRight: 30 }}>{i18n.t("email_not_received")}</Text>
          </View>
        )}
        <Text
          style={{
            alignSelf: "center",
            paddingVertical: 30,
            fontSize: 25,
            color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText,
          }}
        >
          {i18n.t("login")}
        </Text>

        {error === "incorrect_login_credentials" && (
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <AntDesign name="exclamationcircleo" size={14} color="red" style={{ paddingRight: 5 }} />
            <Text style={{ fontSize: 14, color: "red" }}>{i18n.t("incorrect_login_credentials")}</Text>
          </View>
        )}

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme === "dark" ? themeColors.dark.background : themeColors.light.background,
              borderColor: error ? "red" : theme === "dark" ? themeColors.dark.border : themeColors.light.border,
              color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText,
            },
          ]}
          placeholder={i18n.t("email_or_username")}
          placeholderTextColor={theme === "dark" ? undefined : "#999"}
          value={identifier}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          onChangeText={(text) => setIdentifier(text)}
        />
        {error === "Invalid username" && (
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
            <AntDesign name="exclamationcircleo" size={12} color="red" style={{ paddingRight: 5 }} />
            <Text style={{ fontSize: 12, color: "red" }}>{i18n.t("username_requirement")}</Text>
          </View>
        )}

        <View
          style={[
            {
              paddingTop: 12.5,
              paddingBottom: 12.5,
              borderWidth: 1,
              borderRadius: 8,
              paddingLeft: 20,
              paddingRight: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: theme === "dark" ? themeColors.dark.background : themeColors.light.background,
              borderColor: error === "incorrect_login_credentials" ? "red" : theme === "dark" ? themeColors.dark.border : themeColors.light.border,
              marginTop: 20,
            },
          ]}
        >
          <TextInput
            style={{ width: "80%", color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText }}
            placeholder={i18n.t("password")}
            placeholderTextColor={theme === "dark" ? undefined : "#999"}
            value={password}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            secureTextEntry={showPassword}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ marginRight: 5 }}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color={"gray"} />
          </TouchableOpacity>
        </View>
        {/* <Button
          text={loading ? "Loading" : i18n.t("continue")}
          onPress={() => {
            login();
          }}
          style={{
            marginTop: 20,
          }}
          disabled={loading}
          textStyle={{ marginVertical: 3 }}
        /> */}

        <Pressable
          onPress={() => {
            login();
          }}
          disabled={loading}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{loading ? "Loading" : i18n.t("continue")}</Text>
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText }}>{i18n.t("dont_have_account")}</Text>
          <TouchableOpacity
            onPress={() => {
              router.replace("/settings/(auth)/register");
            }}
          >
            <Text
              style={{
                marginLeft: 5,
                color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText,
              }}
            >
              {i18n.t("registerHere")}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.replace("/settings/(auth)/forgetPassword");
            }}
          >
            <Text style={{ color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText }}>{i18n.t("forget_password")}</Text>
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
  button: {
    marginTop: 25,
    backgroundColor: "#3399ff",
    borderRadius: 6,
  },
  buttonText: {
    padding: 16,
    textAlign: "center",
    fontSize: 15,
    color: "081421",
    fontWeight: "500",
  },
});
