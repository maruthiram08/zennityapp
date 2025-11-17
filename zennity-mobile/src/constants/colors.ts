/**
 * Zennity Brand Colors
 * Design System - Color Palette
 */

export const Colors = {
  // Brand Colors
  primary: '#FF6B35', // Vibrant Orange
  secondary: '#5856D6', // Purple

  // Status Colors
  success: '#34C759', // Success Green
  warning: '#FF9500', // Warning Orange
  error: '#FF3B30', // Alert Red
  info: '#007AFF', // Info Blue

  // Backgrounds
  background: '#FAFAFA', // Light Gray
  surface: '#FFFFFF', // Pure White
  surfaceSecondary: '#F8F8F8', // Subtle Gray

  // Text Colors
  textPrimary: '#1A1A1A', // Almost Black
  textSecondary: '#666666', // Medium Gray
  textTertiary: '#999999', // Light Gray
  textWhite: '#FFFFFF',

  // Border Colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',

  // Shadow Color
  shadow: 'rgba(0, 0, 0, 0.08)',
  shadowDark: 'rgba(0, 0, 0, 0.12)',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Gradients
  gradients: {
    purple: ['#667eea', '#764ba2'],
    orange: ['#FF6B35', '#ff5722'],
    green: ['#34C759', '#28A745'],
    card1: ['#667eea', '#764ba2'],
    card2: ['#F093FB', '#F5576C'],
    card3: ['#FFD89B', '#19547B'],
    card4: ['#4FACFE', '#00F2FE'],
    card5: ['#FA709A', '#FEE140'],
  },

  // Badge Colors (for different deal types)
  badge: {
    hot: '#FF3B30',
    transfer: '#5856D6',
    welcome: '#34C759',
    stacking: '#5856D6',
    bank: '#34C759',
    miles: '#5856D6',
  },
} as const;

export type ColorKey = keyof typeof Colors;
