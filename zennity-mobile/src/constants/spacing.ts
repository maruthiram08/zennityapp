/**
 * Zennity Spacing System
 * Consistent spacing values throughout the app
 */

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 15,
  xl: 20,
  '2xl': 25,
  '3xl': 30,
  '4xl': 40,
} as const;

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  pill: 999,
} as const;

export const IconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
} as const;

// Layout Constants
export const Layout = {
  screenPadding: Spacing.xl, // 20px horizontal padding
  cardPadding: Spacing.lg, // 15px card padding
  sectionSpacing: Spacing['2xl'], // 25px between sections
  statusBarHeight: 44,
  bottomNavHeight: 70,
  minTouchTarget: 44, // iOS minimum touch target
} as const;

// Shadow Styles
export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3, // Android
  },
  cardHover: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6, // Android
  },
  button: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2, // Android
  },
} as const;
