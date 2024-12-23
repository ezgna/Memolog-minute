import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="register" />
      <Stack.Screen name="login" />
      <Stack.Screen name="forgetPassword" />
      <Stack.Screen name="changeEmail" />
      <Stack.Screen name="changeUsername" />
      <Stack.Screen name="(hidden)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
