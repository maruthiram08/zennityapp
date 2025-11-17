import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Theme } from '@constants/theme';
import { DealType } from '@models/Deal';

export type BadgeVariant = 'hot' | 'transfer' | 'welcome' | 'stacking' | 'bank' | 'miles' | 'info';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  icon?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'info',
  icon,
  style,
  textStyle,
}) => {
  const getBadgeColor = (): string => {
    switch (variant) {
      case 'hot':
        return Theme.colors.badge.hot;
      case 'transfer':
        return Theme.colors.badge.transfer;
      case 'welcome':
        return Theme.colors.badge.welcome;
      case 'stacking':
        return Theme.colors.badge.stacking;
      case 'bank':
        return Theme.colors.badge.bank;
      case 'miles':
        return Theme.colors.badge.miles;
      default:
        return Theme.colors.primary;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getBadgeColor() }, style]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

// Helper function to get badge variant from deal type
export const getBadgeVariantFromDealType = (dealType: DealType): BadgeVariant => {
  switch (dealType) {
    case DealType.HOT:
      return 'hot';
    case DealType.TRANSFER:
      return 'transfer';
    case DealType.WELCOME:
      return 'welcome';
    case DealType.STACKING:
      return 'stacking';
    case DealType.BANK_BONUS:
      return 'bank';
    case DealType.MILES_SALE:
      return 'miles';
    default:
      return 'info';
  }
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.pill,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
    fontSize: Theme.fontSizes.xs,
  },
  text: {
    ...Theme.textStyles.badge,
    color: Theme.colors.textWhite,
  },
});
