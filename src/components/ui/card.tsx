import { StyleSheet, View, type ViewProps } from 'react-native';

import { colors, radii, sizes, spacing } from '@/theme';

/** White rounded container with a thin border. */
export function Card({ style, ...rest }: ViewProps) {
  return <View style={[styles.card, style]} {...rest} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: sizes.borderWidth,
    borderColor: colors.border,
    padding: spacing[5],
  },
});
