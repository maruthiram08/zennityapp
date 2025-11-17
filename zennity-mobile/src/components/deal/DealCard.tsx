import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { Badge, getBadgeVariantFromDealType } from '../common/Badge';
import { Button } from '../common/Button';
import { Deal, DealType, DealComplexity } from '@models';
import { Theme } from '@constants/theme';

interface DealCardProps {
  deal: Deal;
  onTrack?: (dealId: string) => void;
  onSave?: (dealId: string) => void;
  onDetails?: (dealId: string) => void;
}

// Helper function to get emoji for deal type
const getDealTypeEmoji = (type: DealType): string => {
  switch (type) {
    case DealType.WELCOME:
      return '🎁';
    case DealType.TRANSFER:
      return '✈️';
    case DealType.BANK_BONUS:
      return '🏦';
    case DealType.STACKING:
      return '🎯';
    case DealType.MILES_SALE:
      return '💰';
    case DealType.HOT:
      return '⚡';
    default:
      return '💰';
  }
};

// Helper function to get badge text with emoji
const getBadgeText = (deal: Deal): string => {
  const emoji = getDealTypeEmoji(deal.type);

  if (deal.type === DealType.WELCOME) return `${emoji} Welcome Offer`;
  if (deal.type === DealType.TRANSFER) return `${emoji} Transfer Bonus`;
  if (deal.type === DealType.BANK_BONUS) return `${emoji} Bank Bonus`;
  if (deal.type === DealType.STACKING) return `${emoji} Stacking Hack`;
  if (deal.type === DealType.MILES_SALE) return `${emoji} Spend Offer`;
  if (deal.type === DealType.HOT) return `${emoji} Breaking`;

  return `${emoji} Deal`;
};

// Check if deal is urgent (3 days or less)
const isUrgent = (deal: Deal): boolean => {
  if (deal.daysLeft !== undefined) {
    return deal.daysLeft <= 3;
  }
  return false;
};

// Get days remaining text
const getDaysRemaining = (deal: Deal): string => {
  if (!deal.daysLeft) return '';
  if (deal.daysLeft === 1) return '1 day';
  return `${deal.daysLeft} days`;
};

// Get badge color based on deal type
const getBadgeColor = (type: DealType): string => {
  switch (type) {
    case DealType.HOT:
      return Theme.colors.primary;
    case DealType.TRANSFER:
      return Theme.colors.secondary;
    case DealType.WELCOME:
      return Theme.colors.success;
    case DealType.BANK_BONUS:
      return Theme.colors.warning;
    case DealType.STACKING:
      return '#9B59B6';
    default:
      return Theme.colors.primary;
  }
};

// Get difficulty icon
const getDifficultyIcon = (complexity?: DealComplexity): string => {
  switch (complexity) {
    case DealComplexity.EASY:
      return 'speedometer-slow';
    case DealComplexity.MODERATE:
      return 'speedometer-medium';
    case DealComplexity.COMPLEX:
      return 'speedometer';
    default:
      return 'speedometer-medium';
  }
};

export const DealCard: React.FC<DealCardProps> = ({ deal, onTrack, onSave, onDetails }) => {
  const badgeColor = getBadgeColor(deal.type);
  const urgent = isUrgent(deal);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => onDetails?.(deal.id)}
      style={styles.touchable}
    >
      <Card style={styles.card}>
        {/* Bank Logo */}
        {deal.bankName && (
          <View style={styles.bankLogoContainer}>
            <View style={[styles.bankLogo, { backgroundColor: badgeColor }]}>
              <Text style={styles.bankLogoText}>
                {deal.bankName.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
        )}

        {/* Badge Container */}
        <View style={styles.badgeContainer}>
          <Badge
            text={getBadgeText(deal)}
            variant={getBadgeVariantFromDealType(deal.type)}
          />
        </View>

        {/* Urgent Tag */}
        {urgent && (
          <View style={styles.urgentTag}>
            <MaterialCommunityIcons name="fire" size={14} color={Theme.colors.background} />
            <Text style={styles.urgentText}>{getDaysRemaining(deal)} left</Text>
          </View>
        )}

        {/* Title with verified badge */}
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {deal.title}
          </Text>
          {deal.tags?.includes('verified') && (
            <MaterialCommunityIcons
              name="check-decagram"
              size={20}
              color={Theme.colors.success}
              style={styles.verifiedIcon}
            />
          )}
        </View>

        <Text style={styles.subtitle} numberOfLines={2}>
          {deal.subtitle}
        </Text>

        {/* Requirements Box */}
        {deal.requirements && deal.requirements.length > 0 && (
          <View style={[styles.requirementsBox, { borderLeftColor: badgeColor }]}>
            {deal.requirements.map((req) => (
              <View key={req.id} style={styles.requirementItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color={Theme.colors.success}
                  style={styles.checkIcon}
                />
                <Text style={styles.requirementText}>{req.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Value Container with Gradient */}
        <LinearGradient
          colors={[`${badgeColor}15`, `${badgeColor}05`]}
          style={styles.valueContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.valueRow}>
            <View style={styles.valueContent}>
              <Text style={styles.rewardLabel}>REWARD</Text>
              <Text style={[styles.value, { color: badgeColor }]}>{deal.value}</Text>
            </View>
            {deal.rewardAmount && deal.rewardAmount > 0 && (
              <View style={[styles.percentageBadge, { backgroundColor: badgeColor }]}>
                <Text style={styles.percentageText}>
                  {Math.round(deal.rewardAmount)}%
                </Text>
              </View>
            )}
          </View>

          {/* Meta Info Row */}
          <View style={styles.metaRow}>
            {deal.daysLeft !== undefined && (
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={14}
                  color={Theme.colors.textSecondary}
                />
                <Text style={styles.metaText}>
                  {getDaysRemaining(deal)} left
                </Text>
              </View>
            )}
            {deal.complexity && (
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name={getDifficultyIcon(deal.complexity)}
                  size={14}
                  color={Theme.colors.textSecondary}
                />
                <Text style={styles.metaText}>{deal.complexity}</Text>
              </View>
            )}
          </View>
        </LinearGradient>

        {/* Button Row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              {
                backgroundColor: deal.isTracked ? Theme.colors.surfaceSecondary : badgeColor,
              },
            ]}
            onPress={() => onTrack?.(deal.id)}
          >
            <MaterialCommunityIcons
              name={deal.isTracked ? 'check-circle' : 'plus-circle'}
              size={18}
              color={deal.isTracked ? Theme.colors.textSecondary : Theme.colors.background}
              style={styles.buttonIcon}
            />
            <Text
              style={[
                styles.primaryButtonText,
                {
                  color: deal.isTracked ? Theme.colors.textSecondary : Theme.colors.background,
                },
              ]}
            >
              {deal.isTracked ? 'Tracking' : 'Track This'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondaryButton,
              {
                borderColor: badgeColor,
                backgroundColor: deal.isSaved
                  ? `${badgeColor}15`
                  : Theme.colors.background,
              },
            ]}
            onPress={() => onSave?.(deal.id)}
          >
            <MaterialCommunityIcons
              name={deal.isSaved ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={badgeColor}
              style={styles.buttonIcon}
            />
            <Text style={[styles.secondaryButtonText, { color: badgeColor }]}>
              {deal.isSaved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginBottom: 16,
  },
  card: {
    position: 'relative',
    padding: 16,
    borderRadius: 16,
    backgroundColor: Theme.colors.background,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  bankLogoContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 2,
  },
  bankLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  bankLogoText: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.background,
  },
  badgeContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  urgentTag: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: Theme.colors.error,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    zIndex: 1,
  },
  urgentText: {
    color: Theme.colors.background,
    fontSize: 12,
    fontWeight: '700',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 52,
    marginBottom: 8,
    paddingRight: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.textPrimary,
    lineHeight: 28,
    flex: 1,
  },
  verifiedIcon: {
    marginLeft: 6,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 15,
    color: Theme.colors.textSecondary,
    marginBottom: 16,
    lineHeight: 21,
  },
  requirementsBox: {
    backgroundColor: `${Theme.colors.primary}08`,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 3,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  checkIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  requirementText: {
    flex: 1,
    fontSize: 14,
    color: Theme.colors.textPrimary,
    lineHeight: 20,
  },
  valueContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  valueContent: {
    flex: 1,
  },
  rewardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Theme.colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  percentageBadge: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 12,
  },
  percentageText: {
    color: Theme.colors.background,
    fontSize: 16,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: Theme.colors.textSecondary,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 6,
  },
});
