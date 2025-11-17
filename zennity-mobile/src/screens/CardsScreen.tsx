import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@components/common/Card';
import { Badge } from '@components/common/Badge';
import { Button } from '@components/common/Button';
import { useCardsStore } from '@store';
import { Theme } from '@constants/theme';

const CardsScreen = () => {
  const { cards } = useCardsStore();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>My Cards</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {cards.map(card => (
          <Card key={card.id} style={styles.cardItem}>
            <View style={styles.cardRow}>
              <LinearGradient
                colors={card.gradientColors || ['#667eea', '#764ba2']}
                style={styles.cardVisual}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />

              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{card.name}</Text>
                <Text style={styles.bankName}>{card.bankName}</Text>

                <View style={styles.badgeRow}>
                  <Badge
                    text={`${card.activeOffersCount} Active Offers`}
                    variant="hot"
                    textStyle={styles.badgeText}
                  />
                </View>

                {card.feeDaysRemaining && (
                  <Text style={styles.metaText}>Fee due in {card.feeDaysRemaining} days</Text>
                )}
              </View>

              <Text style={styles.chevron}>›</Text>
            </View>
          </Card>
        ))}

        <Button
          title="+ Add Card"
          onPress={() => {}}
          variant="primary"
          fullWidth
          style={styles.addButton}
        />
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Theme.layout.screenPadding,
    paddingBottom: Theme.spacing.xl,
  },
  cardItem: {
    marginBottom: Theme.spacing.md,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardVisual: {
    width: 60,
    height: 40,
    borderRadius: 6,
    marginRight: Theme.spacing.md,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: Theme.fontSizes.xl,
    fontWeight: '600',
    marginBottom: 2,
  },
  bankName: {
    fontSize: Theme.fontSizes.base,
    color: Theme.colors.textSecondary,
    marginBottom: 4,
  },
  badgeRow: {
    marginVertical: 4,
  },
  badgeText: {
    fontSize: 10,
  },
  metaText: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.textTertiary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 18,
    color: Theme.colors.textTertiary,
    marginLeft: Theme.spacing.sm,
  },
  addButton: {
    marginTop: Theme.spacing.lg,
  },
});

export default CardsScreen;
