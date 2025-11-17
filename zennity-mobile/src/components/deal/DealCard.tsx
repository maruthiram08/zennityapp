import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common/Card';
import { Badge, getBadgeVariantFromDealType } from '../common/Badge';
import { Button } from '../common/Button';
import { Deal } from '@models';
import { Theme } from '@constants/theme';

interface DealCardProps {
  deal: Deal;
  onTrack?: (dealId: string) => void;
  onSave?: (dealId: string) => void;
  onDetails?: (dealId: string) => void;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, onTrack, onSave, onDetails }) => {
  const badgeText = deal.daysLeft
    ? `🔥 Ends in ${deal.daysLeft} day${deal.daysLeft > 1 ? 's' : ''}`
    : deal.type === 'transfer'
    ? 'Transfer Bonus'
    : deal.type === 'welcome'
    ? 'Welcome Offer'
    : deal.type === 'stacking'
    ? 'Stacking Hack'
    : 'Deal';

  const valueColor =
    deal.type === 'hot'
      ? Theme.colors.primary
      : deal.type === 'transfer'
      ? Theme.colors.secondary
      : deal.type === 'welcome'
      ? Theme.colors.success
      : Theme.colors.primary;

  return (
    <Card style={styles.container}>
      <View style={styles.badgeContainer}>
        <Badge text={badgeText} variant={getBadgeVariantFromDealType(deal.type)} />
      </View>

      <Text style={styles.title}>{deal.title}</Text>
      <Text style={styles.subtitle}>{deal.subtitle}</Text>

      {deal.requirements && deal.requirements.length > 0 && (
        <View style={styles.requirementsBox}>
          {deal.requirements.map(req => (
            <View key={req.id} style={styles.requirementItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.requirementText}>{req.description}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={[styles.value, { color: valueColor }]}>{deal.value}</Text>

      <View style={styles.buttonRow}>
        <Button
          title={deal.isTracked ? 'Tracking' : 'Track This'}
          onPress={() => onTrack?.(deal.id)}
          variant="primary"
          style={styles.button}
        />
        <Button
          title={deal.isSaved ? 'Saved' : 'Save'}
          onPress={() => onSave?.(deal.id)}
          variant="secondary"
          style={styles.button}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: Theme.spacing.lg,
    right: Theme.spacing.lg,
    zIndex: 1,
  },
  title: {
    ...Theme.textStyles.title2,
    marginBottom: 6,
    paddingRight: 100,
  },
  subtitle: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  requirementsBox: {
    backgroundColor: Theme.colors.surfaceSecondary,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 3,
  },
  checkmark: {
    color: Theme.colors.success,
    fontWeight: '700',
    marginRight: 8,
    fontSize: Theme.fontSizes.base,
  },
  requirementText: {
    flex: 1,
    fontSize: Theme.fontSizes.base,
    color: '#444444',
  },
  value: {
    fontSize: Theme.fontSizes['2xl'],
    fontWeight: '700',
    marginVertical: Theme.spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  button: {
    flex: 1,
  },
});
