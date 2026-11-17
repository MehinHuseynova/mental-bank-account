/**
 * 4-pt spacing scale. The key is the multiplier: spacing[4] = 16, spacing[7] = 28.
 */
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

/** Corner radii (pt). */
export const radii = {
  tile: 12,
  button: 16,
  card: 20,
  pill: 999,
} as const;

/** Fixed component sizes from design/README.md (pt). */
export const sizes = {
  /** Minimum touch target for anything tappable. */
  touchTarget: 44,
  buttonHeight: 56,
  tile: 48,
  dot: 8,
  dotActiveWidth: 24,
  borderWidth: 1,
} as const;

/** Screen-level layout values. */
export const layout = {
  screenPaddingHorizontal: spacing[7],
} as const;
