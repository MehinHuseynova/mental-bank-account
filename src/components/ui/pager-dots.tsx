import { StyleSheet, View } from 'react-native';

import { colors, radii, sizes, spacing } from '@/theme';

type PagerDotsProps = {
  count: number;
  /** Zero-based index of the current page. */
  index: number;
  /** Read by VoiceOver, e.g. "Page 1 of 4". */
  accessibilityLabel: string;
};

/** Page indicator: one dot per page, the current one wider and in the primary color. */
export function PagerDots({ count, index, accessibilityLabel }: PagerDotsProps) {
  return (
    <View style={styles.row} accessible accessibilityLabel={accessibilityLabel}>
      {Array.from({ length: count }, (_, i) => (
        <View key={i} style={[styles.dot, i === index && styles.active]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[2],
  },
  dot: {
    width: sizes.dot,
    height: sizes.dot,
    borderRadius: radii.pill,
    backgroundColor: colors.dotInactive,
  },
  active: {
    width: sizes.dotActiveWidth,
    backgroundColor: colors.primary,
  },
});
