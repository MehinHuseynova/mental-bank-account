import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { sizes } from '@/theme';

type TextButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
};

/**
 * A text-only button in the primary color. Works with `<Link asChild>`, which passes
 * its onPress through the spread props.
 */
export function TextButton({ label, style, ...rest }: TextButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={(state) => [styles.base, typeof style === 'function' ? style(state) : style]}
      {...rest}
    >
      <AppText variant="button" color="primary">
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
