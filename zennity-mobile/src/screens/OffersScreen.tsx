import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Card } from '@components/common/Card';
import { Badge } from '@components/common/Badge';
import { Button } from '@components/common/Button';
import { FilterChip } from '@components/common/FilterChip';
import { Theme } from '@constants/theme';
import { useNavigation } from '@react-navigation/native';

const OffersScreen = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigation = useNavigation();

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Spend', value: 'spend' },
    { label: 'Transfer', value: 'transfer' },
    { label: 'Welcome', value: 'welcome' },
  ];

  const offers = [
    {
      id: '1',
      title: 'Tata Neu + Big Basket GC',
      description: '12.5% total return via triple stack',
      badge: 'Stacking Hack',
      badgeVariant: 'stacking' as const,
      complexity: 'Complex • High Value',
    },
    {
      id: '2',
      title: 'ICICI Savings Account',
      description: '₹1000 on ₹25K MAB for 2 months',
      badge: 'Bank Bonus',
      badgeVariant: 'bank' as const,
      complexity: 'Easy • Quick Win',
    },
    {
      id: '3',
      title: 'IHG Buy Points 100% Bonus',
      description: 'Buy points at 0.5¢ each with bonus',
      badge: 'Miles Sale',
      badgeVariant: 'miles' as const,
      complexity: 'Until Nov 30',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Offers</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map(filter => (
          <FilterChip
            key={filter.value}
            label={filter.label}
            active={activeFilter === filter.value}
            onPress={() => setActiveFilter(filter.value)}
            style={styles.filterChip}
          />
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Calculator */}
        <Card style={styles.calculatorCard}>
          <View style={styles.calculatorRow}>
            <Text style={styles.calculatorIcon}>🧮</Text>
            <View style={styles.calculatorInfo}>
              <Text style={styles.calculatorTitle}>Stacking Calculator</Text>
              <Text style={styles.calculatorSubtitle}>Find the best card + portal combo</Text>
            </View>
          </View>
        </Card>
        <Button
          title="Calculate Max Value"
          onPress={() => {}}
          variant="primary"
          fullWidth
          style={styles.calculateButton}
        />

        <Text style={styles.sectionTitle}>🔥 Trending Offers</Text>

        {offers.map(offer => (
          <Card key={offer.id} compact>
            <View style={styles.offerHeader}>
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Badge text={offer.badge} variant={offer.badgeVariant} />
            </View>
            <Text style={styles.offerDescription}>{offer.description}</Text>
            <Text style={styles.offerComplexity}>{offer.complexity}</Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingHorizontal: Theme.layout.screenPadding,
    paddingTop: Theme.spacing.xl,
    paddingBottom: Theme.spacing.lg,
  },
  title: {
    ...Theme.textStyles.largeTitle,
  },
  filterContainer: {
    paddingLeft: Theme.layout.screenPadding,
    marginBottom: Theme.spacing.lg,
  },
  filterContent: {
    paddingRight: Theme.layout.screenPadding,
    gap: Theme.spacing.sm,
  },
  filterChip: {
    marginRight: Theme.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Theme.layout.screenPadding,
    paddingBottom: Theme.spacing.xl,
  },
  calculatorCard: {
    marginBottom: 0,
  },
  calculatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calculatorIcon: {
    fontSize: 40,
    marginRight: Theme.spacing.lg,
  },
  calculatorInfo: {
    flex: 1,
  },
  calculatorTitle: {
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
    marginBottom: 4,
  },
  calculatorSubtitle: {
    fontSize: Theme.fontSizes.base,
    color: Theme.colors.textSecondary,
  },
  calculateButton: {
    marginTop: -8,
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.fontSizes.xl,
    fontWeight: '600',
    marginTop: Theme.spacing['2xl'],
    marginBottom: Theme.spacing.md,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  offerTitle: {
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
    flex: 1,
    marginRight: Theme.spacing.sm,
  },
  offerDescription: {
    fontSize: Theme.fontSizes.base,
    color: Theme.colors.textSecondary,
    marginBottom: 6,
  },
  offerComplexity: {
    fontSize: Theme.fontSizes.xs,
    color: Theme.colors.textTertiary,
  },
});

export default OffersScreen;
