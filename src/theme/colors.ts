/**
 * Color tokens, measured from the designs (see design/README.md).
 * Names describe the role ("primary", "textMuted"), never the look ("green"),
 * so a dark palette can be added later with the same keys.
 */
const light = {
  background: '#F3F5F1',
  surface: '#FFFFFF',
  border: '#E1E6E1',

  primary: '#2E6B5E',
  onPrimary: '#FFFFFF',

  textPrimary: '#1E2B2A',
  textSecondary: '#44524F',
  textMuted: '#5B6B68',

  dotInactive: '#C5D0CB',
  illustrationBg: '#E8EEE9',
  gold: '#E0A630',

  dayEmpty: '#E9EDEA',
  dayMissed: '#A9B6B1',

  effort: { background: '#E2EFEA', foreground: '#2E6B5E' },
  success: { background: '#F6EDD8', foreground: '#8A5A00' },
  progress: { background: '#E3ECF5', foreground: '#2F5F8A' },
} as const;

export type Palette = typeof light;

/** Light mode only for now. */
export const colors: Palette = light;

/** Tokens that hold a single color string (usable for text, borders, backgrounds). */
export type ColorToken = {
  [K in keyof Palette]: Palette[K] extends string ? K : never;
}[keyof Palette];
