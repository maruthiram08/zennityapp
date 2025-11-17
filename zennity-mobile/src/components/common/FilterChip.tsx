import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '@constants/theme';

interface FilterChipProps {
  label: string;
  active?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, active = false, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.chip, active ? styles.chipActive : styles.chipInactive, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, active ? styles.textActive : styles.textInactive]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.pill,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  chipInactive: {
    backgroundColor: Theme.colors.surface,
    borderColor: Theme.colors.border,
  },
  text: {
    fontSize: Theme.fontSizes.md,
    fontWeight: Theme.fontWeights.semibold,
  },
  textActive: {
    color: Theme.colors.textWhite,
  },
  textInactive: {
    color: Theme.colors.textSecondary,
  },
});
