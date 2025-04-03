import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as Font from "expo-font";

// Define the type for the context value
interface FontContextType {
  fontsLoaded: boolean;
}

// Create a context with a default undefined value
const FontContext = createContext<FontContextType | undefined>(undefined);

interface FontProviderProps {
  children: ReactNode;
}

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        first: require("../../assets/fonts/first.ttf"),
        second: require("../../assets/fonts/second.ttf"),
        primary: require("../../assets/fonts/primary.ttf"),
        pts: require("../../assets/fonts/pts.ttf"),
        tail: require("../../assets/fonts/tail.ttf"),
        monst: require("../../assets/fonts/monst.ttf"),
        ptsbold: require("../../assets/fonts/ptsbold.ttf"),
        ptr: require("../../assets/fonts/ptr.ttf"),
        ank: require("../../assets/fonts/ank.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []); // ✅ Fix: Ensure it runs only once on mount

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = (): FontContextType => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};
