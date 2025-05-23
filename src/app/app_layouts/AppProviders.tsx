import { DataProvider } from "@/src/contexts/DataContext";
import { SettingsProvider } from "@/src/contexts/SettingsContext";
import { LanguageProvider } from "@/src/contexts/LanguageContext";
import { ThemeProvider, useThemeContext } from "@/src/contexts/ThemeContext";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { AdsProvider } from "@/src/contexts/AdsContext";

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AdsProvider>
      <LanguageProvider>
        <SettingsProvider>
          <ThemeProvider>
            <DataProvider>
              <ActionSheetProvider>
                <RootSiblingParent>
                  <GestureHandlerRootView style={{ flex: 1 }}>{children}</GestureHandlerRootView>
                </RootSiblingParent>
              </ActionSheetProvider>
            </DataProvider>
          </ThemeProvider>
        </SettingsProvider>
      </LanguageProvider>
    </AdsProvider>
  );
};

export default AppProviders;
