import type { ReactNode } from 'react';
import { StyleSheet, View, type ColorValue } from 'react-native';

import { radii, sizes } from '@/theme';

type IconTileProps = {
  /** Tile color, taken from the theme by the caller. */
  backgroundColor: ColorValue;
  children: ReactNode;
};

/** Small rounded square holding a letter or an icon. */
export function IconTile({ backgroundColor, children }: IconTileProps) {
  return <View style={[styles.tile, { backgroundColor }]}>{children}</View>;
}

const styles = StyleSheet.create({
  tile: {
    width: sizes.tile,
    height: sizes.tile,
    borderRadius: radii.tile,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
