import { Text, type TextProps } from 'react-native';

import { colors, textStyles, type ColorToken, type TextVariant } from '@/theme';

type AppTextProps = TextProps & {
  variant?: TextVariant;
  color?: ColorToken;
};

const defaultColor: Record<TextVariant, ColorToken> = {
  title: 'textPrimary',
  body: 'textSecondary',
  eyebrow: 'primary',
  cardTitle: 'textPrimary',
  cardText: 'textMuted',
  button: 'onPrimary',
  timeDigits: 'textPrimary',
  timeMeridiem: 'primary',
  tileLetter: 'textPrimary',
  label: 'textSecondary',
  caption: 'primary',
};

/** The only text component screens should use, so every text uses the theme's type scale. */
export function AppText({ variant = 'body', color, style, ...rest }: AppTextProps) {
  return (
    <Text
      style={[textStyles[variant], { color: colors[color ?? defaultColor[variant]] }, style]}
      {...rest}
    />
  );
}
