import { Nunito_400Regular, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { OnboardingProvider, useOnboarding } from '@/features/onboarding/onboarding-provider';
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
      SplashScreen.hide();
    }
  }, [fontsLoaded, fontError]);

  // If loading fails, show the app anyway (system font) instead of a blank screen.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <OnboardingProvider>
      <StatusBar style="dark" />
      <RootStack />
    </OnboardingProvider>
  );
}

/**
 * Onboarding gate: Stack.Protected only registers its screens while `guard` is true.
 * When the flag flips, Expo Router moves to the first screen that is allowed,
 * so finishing onboarding needs no manual redirect.
 */
function RootStack() {
  const { completed } = useOnboarding();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Protected guard={!completed}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>

      <Stack.Protected guard={completed}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="deposit" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen
          name="boost"
          options={{
            headerShown: true,
            title: '',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.textPrimary,
            headerBackTitleStyle: { fontFamily: fonts.bold },
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
