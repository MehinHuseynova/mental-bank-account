import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '@/theme';

type ScreenProps = {
  children: ReactNode;
  /** Which edges get safe-area padding. Screens with a native header can drop 'top'. */
  edges?: Edge[];
};

/** Base wrapper for every screen: app background, safe area and side padding. */
export function Screen({ children, edges = ['top', 'left', 'right'] }: ScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={edges}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: spacing[8],
    gap: spacing[4],
  },
});
