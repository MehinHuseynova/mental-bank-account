import type { TextStyle } from 'react-native';

/**
 * Nunito font families. src/app/_layout.tsx registers the fonts under these
 * names (used as the `useFonts` keys), so this is the single source of truth.
 */
export const fonts = {
  regular: 'Nunito_400Regular',
  bold: 'Nunito_700Bold',
  extraBold: 'Nunito_800ExtraBold',
} as const;

/**
 * Type scale from design/README.md. Font sizes are measured from the designs;
 * line heights are not in the design notes, so they are estimates (~1.2–1.4×)
 * to check on the phone.
 */
export const textStyles = {
  title: { fontFamily: fonts.extraBold, fontSize: 34, lineHeight: 40 },
  body: { fontFamily: fonts.regular, fontSize: 17, lineHeight: 26 },
  eyebrow: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  cardTitle: { fontFamily: fonts.bold, fontSize: 18, lineHeight: 24 },
  cardText: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 21 },
  button: { fontFamily: fonts.bold, fontSize: 17, lineHeight: 22 },
  timeDigits: { fontFamily: fonts.extraBold, fontSize: 40, lineHeight: 48 },
  /** "AM" / "PM" next to the time digits (~70% of the digit size in the design). */
  timeMeridiem: { fontFamily: fonts.extraBold, fontSize: 28, lineHeight: 48 },
  /** The E / S / P letter inside a tile. */
  tileLetter: { fontFamily: fonts.extraBold, fontSize: 24, lineHeight: 28 },
  /** Short bold labels, e.g. weekday names. */
  label: { fontFamily: fonts.bold, fontSize: 14, lineHeight: 18 },
  /** Tiny bold text, e.g. "Today" inside a day circle. */
  caption: { fontFamily: fonts.bold, fontSize: 11, lineHeight: 14 },
} as const satisfies Record<string, TextStyle>;

export type TextVariant = keyof typeof textStyles;
