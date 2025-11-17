import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Theme } from '@constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...styles[`button_${size}`],
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    switch (variant) {
      case 'primary':
        return { ...baseStyle, ...styles.buttonPrimary };
      case 'secondary':
        return { ...baseStyle, ...styles.buttonSecondary };
      case 'outline':
        return { ...baseStyle, ...styles.buttonOutline };
      case 'ghost':
        return { ...baseStyle, ...styles.buttonGhost };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...styles.text,
      ...styles[`text_${size}`],
    };

    switch (variant) {
      case 'primary':
        return { ...baseStyle, ...styles.textPrimary };
      case 'secondary':
        return { ...baseStyle, ...styles.textSecondary };
      case 'outline':
        return { ...baseStyle, ...styles.textOutline };
      case 'ghost':
        return { ...baseStyle, ...styles.textGhost };
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), disabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Theme.colors.textWhite : Theme.colors.primary}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadius.md,
    minHeight: Theme.layout.minTouchTarget,
    paddingHorizontal: Theme.spacing.lg,
    ...Theme.shadows.button,
  },
  button_small: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    minHeight: 36,
  },
  button_medium: {
    paddingVertical: 10,
    paddingHorizontal: Theme.spacing.lg,
  },
  button_large: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    minHeight: 52,
  },
  buttonPrimary: {
    backgroundColor: Theme.colors.primary,
  },
  buttonSecondary: {
    backgroundColor: '#F0F0F0',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    ...Theme.textStyles.button,
  },
  text_small: {
    fontSize: Theme.fontSizes.sm,
  },
  text_medium: {
    fontSize: Theme.fontSizes.md,
  },
  text_large: {
    fontSize: Theme.fontSizes.lg,
  },
  textPrimary: {
    color: Theme.colors.textWhite,
  },
  textSecondary: {
    color: '#333333',
  },
  textOutline: {
    color: Theme.colors.primary,
  },
  textGhost: {
    color: Theme.colors.primary,
  },
});
