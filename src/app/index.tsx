import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { colors, layout, spacing } from '@/theme';

/**
 * Temporary placeholder: shows every text variant so fonts and colors can be checked
 * on the phone. Replaced by onboarding / Today in later tickets, so the copy stays inline.
 */
export default function PlaceholderScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="eyebrow">Eyebrow · Nunito Bold</AppText>
        <AppText variant="title">Title · ExtraBold</AppText>
        <AppText variant="body">
          Body text in Nunito Regular. Every evening you deposit your Effort, Success and Progress.
        </AppText>
        <AppText variant="cardTitle">Card title · Bold</AppText>
        <AppText variant="cardText">Card text · Regular, muted color</AppText>
        <AppText variant="timeDigits">21:30</AppText>
        <AppText variant="button" color="primary">
          Button text · Bold
        </AppText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingVertical: spacing[8],
    gap: spacing[4],
  },
});
