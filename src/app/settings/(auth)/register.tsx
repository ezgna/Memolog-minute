import { useThemeContext } from "@/src/contexts/ThemeContext";
import i18n from "@/src/utils/i18n";
import { supabase } from "@/src/utils/supabase";
import { themeColors } from "@/src/utils/theme";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Pressable } from "react-native";
import Toast from "react-native-root-toast";

export default function () {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [resendCredentials, setResendCredentials] = useState({ email, password });
  const [isResended, setIsResended] = useState(false);
  const { theme } = useThemeContext();

  const register = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("users").select("user_id").eq("email", email).single();
      if (data) {
        Toast.show(i18n.t("email_already_registered"));
        setIsEmailValid(false);
        setEmail("");
        return;
      } else if (error.details === "The result contains 0 rows") {
        setIsEmailValid(true);
      }

      const {
        data: { session },
        error: signUpError,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            language: i18n.locale,
          },
          emailRedirectTo: "https://sites.google.com/view/memolog-minute/confirmation",
        },
      });
      if (signUpError) {
        Alert.alert(signUpError.message);
        return;
      }
      if (!session) {
        // await AsyncStorage.setItem("username", username);
        // Alert.alert(i18n.t("email_verification_propmt"));
        // router.navigate("/");
        setIsRegistered(true);
        setResendCredentials({ email, password });
      } else if (session) {
        console.error("unknown error");
      }
      setEmail("");
      setPassword("");
      // setUsername("");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
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
          style={{
            alignSelf: "center",
            fontSize: 25,
            padding: 30,
            color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText,
          }}
        >
          {i18n.t("register")}
        </Text>
        {isRegistered ? (
          <View>
            {isResended && (
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }}>
                <AntDesign name="exclamationcircleo" size={25} color="red" style={{ paddingRight: 15 }} />
                <Text style={{ paddingRight: 30, color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText }}>
                  {i18n.t("email_not_received")}
                </Text>
              </View>
            )}
            <Text style={{ marginBottom: 10, color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText }}>{i18n.t("email_sent")}</Text>
            {/* <Button
              title={loading ? "Loading" : i18n.t("resend_email")}
              onPress={async () => {
                try {
                  setLoading(true);
                  const { error } = await supabase.auth.signUp({
                    email: resendCredentials.email,
                    password: resendCredentials.password,
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
                  setIsResended(true);
                  Toast.show(i18n.t("email_resent"));
                } catch (e) {
                  console.error(e);
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
            /> */}
          </View>
        ) : (
          <>
            {/* <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme === "dark" ? themeColors.dark.background : themeColors.light.background,
                  borderColor: !isValidUsername(username) ? "red" : theme === "dark" ? themeColors.dark.border : themeColors.light.border,
                  color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText,
                  marginBottom: 5,
                },
              ]}
              placeholder={i18n.t("username")}
              placeholderTextColor={theme === "dark" ? undefined : "#999"}
              value={username}
              autoCapitalize="none"
              autoComplete='username'
              autoCorrect={false}
              keyboardType="default"
              onChangeText={(text) => setUsername(text)}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {!isValidUsername(username) && (
                <>
                  <AntDesign name="exclamationcircleo" size={12} color="red" style={{ paddingRight: 5 }} />
                  <Text style={{ fontSize: 12, color: "red" }}>{i18n.t("username_requirement")}</Text>
                </>
              )}
            </View> */}
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme === "dark" ? themeColors.dark.background : themeColors.light.background,
                  borderColor: theme === "dark" ? themeColors.dark.border : themeColors.light.border,
                  color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText,
                  // marginTop: 15,
                },
              ]}
              placeholder={i18n.t("email")}
              placeholderTextColor={theme === "dark" ? undefined : "#999"}
              value={email}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

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
                  borderColor: theme === "dark" ? themeColors.dark.border : themeColors.light.border,
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
            <Pressable
              onPress={() => {
                register();
              }}
              disabled={loading}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{loading ? "Loading" : i18n.t("createAnAccount")}</Text>
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 25,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText }}>{i18n.t("already_have_account")}</Text>
              <TouchableOpacity
                onPress={() => {
                  router.replace("/settings/(auth)/login");
                }}
              >
                <Text
                  style={{
                    marginLeft: 10,
                    color: theme === "dark" ? themeColors.dark.primaryText : themeColors.light.primaryText,
                  }}
                >
                  {i18n.t("loginHere")}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    color: '081421',
    fontWeight: '500'
  },
});
