import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { colors, radii, sizes } from '@/theme';

type PrimaryButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
};

/** Full-width filled button for the main action on a screen. */
export function PrimaryButton({ label, ...rest }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
      {...rest}
    >
      <AppText variant="button">{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: sizes.buttonHeight,
    borderRadius: radii.button,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
});
