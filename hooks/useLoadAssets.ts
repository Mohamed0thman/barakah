import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

export function useLoadAssets() {
  const [hasLoadedFonts, loadingFontsError] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loadingFontsError) throw loadingFontsError;
  }, [loadingFontsError]);

  useEffect(() => {
    if (hasLoadedFonts) {
      SplashScreen.hideAsync();
    }
  }, [hasLoadedFonts]);

  return { isLoaded: hasLoadedFonts };
}
