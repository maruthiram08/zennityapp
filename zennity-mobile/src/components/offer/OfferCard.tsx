/**
 * OfferCard Component - Displays offer information in a card format
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Offer, OfferVerificationStatus } from '../../models/Offer';
import { Theme } from '../../constants/Theme';
import Card from '../Card';
import Badge from '../Badge';

interface OfferCardProps {
  offer: Offer;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onTogglePublish?: () => void;
  style?: ViewStyle;
  compact?: boolean;
}

const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  onPress,
  onEdit,
  onDelete,
  onTogglePublish,
  style,
  compact = false,
}) => {
  const isExpired = new Date(offer.expiryDate) <= new Date();
  const daysUntilExpiry = Math.ceil(
    (new Date(offer.expiryDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const getStatusColor = () => {
    switch (offer.verificationStatus) {
      case OfferVerificationStatus.VERIFIED:
        return Theme.colors.success;
      case OfferVerificationStatus.PENDING:
        return Theme.colors.warning;
      case OfferVerificationStatus.REJECTED:
        return Theme.colors.error;
      case OfferVerificationStatus.EXPIRED:
        return Theme.colors.textTertiary;
      default:
        return Theme.colors.textSecondary;
    }
  };

  const getStatusIcon = () => {
    switch (offer.verificationStatus) {
      case OfferVerificationStatus.VERIFIED:
        return 'check-circle';
      case OfferVerificationStatus.PENDING:
        return 'clock-outline';
      case OfferVerificationStatus.REJECTED:
        return 'close-circle';
      case OfferVerificationStatus.EXPIRED:
        return 'calendar-remove';
      default:
        return 'help-circle';
    }
  };

  return (
    <Card onPress={onPress} style={[styles.container, style]} compact={compact}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title} numberOfLines={2}>
            {offer.title}
          </Text>
          <View style={styles.statusRow}>
            <MaterialCommunityIcons
              name={getStatusIcon()}
              size={14}
              color={getStatusColor()}
            />
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {offer.verificationStatus.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Action buttons */}
        {(onEdit || onDelete || onTogglePublish) && (
          <View style={styles.actions}>
            {onTogglePublish && (
              <TouchableOpacity
                onPress={onTogglePublish}
                style={styles.actionButton}
              >
                <MaterialCommunityIcons
                  name={offer.isPublished ? 'eye-off' : 'eye'}
                  size={20}
                  color={
                    offer.isPublished
                      ? Theme.colors.success
                      : Theme.colors.textSecondary
                  }
                />
              </TouchableOpacity>
            )}
            {onEdit && (
              <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={20}
                  color={Theme.colors.primary}
                />
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
                <MaterialCommunityIcons
                  name="delete"
                  size={20}
                  color={Theme.colors.error}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={compact ? 2 : 3}>
        {offer.shortDescription}
      </Text>

      {/* Partners */}
      {offer.partners.length > 0 && (
        <View style={styles.partnersRow}>
          <MaterialCommunityIcons
            name="handshake"
            size={14}
            color={Theme.colors.textSecondary}
          />
          <Text style={styles.partnersText} numberOfLines={1}>
            {offer.partners.map((p) => p.name).join(', ')}
          </Text>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        {/* Expiry date */}
        <View style={styles.expiryRow}>
          <MaterialCommunityIcons
            name="calendar"
            size={14}
            color={isExpired ? Theme.colors.error : Theme.colors.textSecondary}
          />
          <Text
            style={[
              styles.expiryText,
              isExpired && styles.expiredText,
            ]}
          >
            {isExpired
              ? 'Expired'
              : daysUntilExpiry === 0
              ? 'Expires today'
              : daysUntilExpiry === 1
              ? 'Expires tomorrow'
              : `${daysUntilExpiry} days left`}
          </Text>
        </View>

        {/* Badges */}
        <View style={styles.badges}>
          {offer.isPublished && (
            <View style={styles.publishedBadge}>
              <MaterialCommunityIcons
                name="check"
                size={10}
                color={Theme.colors.white}
              />
              <Text style={styles.publishedText}>Published</Text>
            </View>
          )}
          {offer.links.length > 0 && (
            <View style={styles.linkBadge}>
              <MaterialCommunityIcons
                name="link"
                size={10}
                color={Theme.colors.primary}
              />
              <Text style={styles.linkText}>{offer.links.length}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Engagement metrics (if available) */}
      {(offer.viewCount || offer.clickCount || offer.savedCount) && (
        <View style={styles.metricsRow}>
          {offer.viewCount ? (
            <View style={styles.metric}>
              <MaterialCommunityIcons
                name="eye"
                size={12}
                color={Theme.colors.textTertiary}
              />
              <Text style={styles.metricText}>{offer.viewCount}</Text>
            </View>
          ) : null}
          {offer.clickCount ? (
            <View style={styles.metric}>
              <MaterialCommunityIcons
                name="cursor-pointer"
                size={12}
                color={Theme.colors.textTertiary}
              />
              <Text style={styles.metricText}>{offer.clickCount}</Text>
            </View>
          ) : null}
          {offer.savedCount ? (
            <View style={styles.metric}>
              <MaterialCommunityIcons
                name="bookmark"
                size={12}
                color={Theme.colors.textTertiary}
              />
              <Text style={styles.metricText}>{offer.savedCount}</Text>
            </View>
          ) : null}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  headerLeft: {
    flex: 1,
    marginRight: Theme.spacing.sm,
  },
  title: {
    ...Theme.typography.h3,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  statusText: {
    ...Theme.typography.caption,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: Theme.spacing.xs,
  },
  actionButton: {
    padding: Theme.spacing.xs,
  },
  description: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
    lineHeight: 20,
  },
  partnersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
    marginBottom: Theme.spacing.sm,
  },
  partnersText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  expiryText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
  expiredText: {
    color: Theme.colors.error,
    fontWeight: '600',
  },
  badges: {
    flexDirection: 'row',
    gap: Theme.spacing.xs,
  },
  publishedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Theme.colors.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  publishedText: {
    ...Theme.typography.caption,
    fontSize: 10,
    color: Theme.colors.white,
    fontWeight: '600',
  },
  linkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Theme.colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  linkText: {
    ...Theme.typography.caption,
    fontSize: 10,
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
    paddingTop: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
    fontSize: 11,
  },
});

export default OfferCard;
