/**
 * Zennity Theme
 * Central theme configuration combining all design tokens
 */

import { Colors } from './colors';
import { TextStyles, FontSizes, FontWeights, LineHeights } from './typography';
import { Spacing, BorderRadius, IconSizes, Layout, Shadows } from './spacing';

export const Theme = {
  colors: Colors,
  textStyles: TextStyles,
  fontSizes: FontSizes,
  fontWeights: FontWeights,
  lineHeights: LineHeights,
  spacing: Spacing,
  borderRadius: BorderRadius,
  iconSizes: IconSizes,
  layout: Layout,
  shadows: Shadows,
} as const;

export type ThemeType = typeof Theme;

export default Theme;
