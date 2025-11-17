import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Theme } from '@constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  compact?: boolean;
  onPress?: () => void;
  leftBorderColor?: string;
  leftBorderWidth?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  compact = false,
  onPress,
  leftBorderColor,
  leftBorderWidth = 4,
}) => {
  const cardStyle: ViewStyle = {
    ...styles.card,
    ...(compact && styles.cardCompact),
    ...(leftBorderColor && {
      borderLeftColor: leftBorderColor,
      borderLeftWidth: leftBorderWidth,
    }),
  };

  if (onPress) {
    return (
      <TouchableOpacity style={[cardStyle, style]} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[cardStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.layout.cardPadding,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.card,
  },
  cardCompact: {
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
});
