import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { layout, spacing } from '@/theme';

/**
 * Layout shared by every onboarding page: the content is vertically centered between
 * the header and the footer (as in the designs), and scrolls if it gets taller than
 * the screen (small iPhones, large Dynamic Type).
 */
export function OnboardingPage({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingVertical: spacing[4],
  },
});
