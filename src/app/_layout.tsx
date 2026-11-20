import { Nunito_400Regular, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { colors, fonts } from '@/theme';

// Keep the splash screen visible until the fonts are loaded (called once, at module level).
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Register each font under the family name the theme uses, so the two can't drift apart.
  const [fontsLoaded, fontError] = useFonts({
    [fonts.regular]: Nunito_400Regular,
    [fonts.bold]: Nunito_700Bold,
    [fonts.extraBold]: Nunito_800ExtraBold,
  });

  useEffect(() => {
    if (fontError && __DEV__) {
      console.warn('Fonts failed to load, falling back to the system font:', fontError);
    }
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // If loading fails, show the app anyway (system font) instead of a blank screen.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </>
  );
}
