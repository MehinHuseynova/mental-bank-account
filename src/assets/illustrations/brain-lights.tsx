import Svg, { Circle, ClipPath, Defs, G, Path } from 'react-native-svg';

import { colors } from '@/theme';

/**
 * Static version of design/Onboarding/assets/brain-lights.svg.
 * The original glows with a CSS animation, which React Native can't run, so the
 * halos use a fixed opacity (the file's reduced-motion value). See ARCHITECTURE.md §6.
 */
const HALO_OPACITY = 0.7;

/** viewBox is 200 × 160, so height = width × 0.8. */
const ASPECT_RATIO = 160 / 200;

const BRAIN_PATH =
  'M34,104 C16,100 8,82 16,68 C8,52 20,34 38,34 C42,18 62,10 78,18 C90,6 114,6 124,16 C140,8 162,14 168,30 C186,32 196,50 188,66 C198,80 190,100 172,104 C170,118 152,126 138,118 C130,128 116,130 106,124 L104,146 C104,152 94,152 94,146 L92,122 C76,126 56,124 48,112 C44,110 38,108 34,104 Z';

/** Coin positions [cx, cy] from the SVG: 24 lit and 6 empty ("24 of 30 days"). */
const LIT: readonly (readonly [number, number])[] = [
  [60, 32],
  [84, 32],
  [108, 32],
  [156, 32],
  [32, 52],
  [54, 52],
  [76, 52],
  [98, 52],
  [142, 52],
  [164, 52],
  [184, 52],
  [30, 72],
  [78, 72],
  [102, 72],
  [126, 72],
  [150, 72],
  [40, 92],
  [64, 92],
  [112, 92],
  [136, 92],
  [160, 92],
  [62, 110],
  [120, 110],
  [144, 110],
];
const EMPTY: readonly (readonly [number, number])[] = [
  [132, 32],
  [120, 52],
  [54, 72],
  [174, 72],
  [88, 92],
  [86, 110],
];

type BrainLightsProps = {
  width: number;
};

/** Brain outline filled with coins ("lights"). Decorative: the text next to it explains it. */
export function BrainLights({ width }: BrainLightsProps) {
  return (
    <Svg width={width} height={width * ASPECT_RATIO} viewBox="0 0 200 160">
      <Defs>
        <ClipPath id="brainClip">
          <Path d={BRAIN_PATH} />
        </ClipPath>
      </Defs>

      <Path d={BRAIN_PATH} fill={colors.illustrationFill} />

      <G clipPath="url(#brainClip)">
        {LIT.map(([cx, cy]) => (
          <G key={`lit-${cx}-${cy}`}>
            <Circle cx={cx} cy={cy} r={10} fill={colors.coinHalo} opacity={HALO_OPACITY} />
            <Circle cx={cx} cy={cy} r={5.5} fill={colors.coin} />
          </G>
        ))}
        {EMPTY.map(([cx, cy]) => (
          <Circle
            key={`empty-${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={5}
            fill="none"
            stroke={colors.coinEmpty}
            strokeWidth={1.5}
            strokeDasharray="2.5 2.5"
          />
        ))}
      </G>

      <Path
        d={BRAIN_PATH}
        fill="none"
        stroke={colors.primary}
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
