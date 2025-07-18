import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type FontType = "default" | "zenmaru" | "zenold" | "rocknroll" | "mplus1p";

interface FontContextType {
  font: FontType;
  setFont: (font: FontType) => Promise<void>;
  fontFamilyStyle: { fontFamily?: string };
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider = ({ children }: { children: ReactNode }) => {
  const [font, setFontState] = useState<FontType>("default");

  useEffect(() => {
    const loadFontPreference = async () => {
      const savedFont = (await AsyncStorage.getItem("selectedFont")) as FontType | null;
      if (savedFont) {
        setFontState(savedFont);
      }
    };
    loadFontPreference();
  }, []);

  const setFont = async (newFont: FontType) => {
    setFontState(newFont);
    await AsyncStorage.setItem("selectedFont", newFont);
  };

  const fontFamilyStyle =
    font === "default"
      ? { fontFamily: undefined }
      : font === "zenmaru"
      ? { fontFamily: "ZenMaruGothic" }
      : font === "zenold"
      ? { fontFamily: "ZenOldMincho" }
      : font === "rocknroll"
      ? { fontFamily: "RocknRollOne" }
      : font === "mplus1p"
      ? { fontFamily: "MPlus1p" }
      : { fontFamily: undefined };

  return <FontContext.Provider value={{ font, setFont, fontFamilyStyle }}>{children}</FontContext.Provider>;
};

export const useFontContext = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("font context error");
  }
  return context;
};
