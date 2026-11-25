import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { sizes, type ColorToken } from '@/theme';

type TextButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  /** Text color. Defaults to the primary color. */
  color?: ColorToken;
};

/**
 * A text-only button. Works with `<Link asChild>`, which passes
 * its onPress through the spread props.
 */
export function TextButton({ label, color = 'primary', style, ...rest }: TextButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={(state) => [styles.base, typeof style === 'function' ? style(state) : style]}
      {...rest}
    >
      <AppText variant="button" color={color}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: sizes.touchTarget,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});
