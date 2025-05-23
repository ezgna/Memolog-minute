import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import AppContent from "./app_layouts/AppContent";
import AppProviders from "./app_layouts/AppProviders";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Kanit: require("../assets/fonts/Kanit-Medium.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    NotoSansJP: require("../assets/fonts/NotoSansJP-Regular.ttf"),
    RocknRollOne: require("../assets/fonts/RocknRollOne-Regular.ttf"),
    RobotoMono: require("../assets/fonts/RobotoMono-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // router.push("/settings/customization");
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}
