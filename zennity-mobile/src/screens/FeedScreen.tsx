import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { DealCard } from '@components/deal/DealCard';
import { FilterChip } from '@components/common/FilterChip';
import { useDealsStore } from '@store';
import { DealCategory } from '@models';
import { Theme } from '@constants/theme';

const FeedScreen = () => {
  const { filteredDeals, activeFilter, setFilter, toggleTrack, toggleSave } = useDealsStore();

  const filters = [
    { label: 'All', value: DealCategory.ALL },
    { label: 'My Cards', value: DealCategory.SPEND },
    { label: 'Watching', value: DealCategory.TRANSFER },
    { label: 'Ending Soon', value: DealCategory.WELCOME },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Feed</Text>
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
            onPress={() => setFilter(filter.value)}
            style={styles.filterChip}
          />
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredDeals.map(deal => (
          <DealCard
            key={deal.id}
            deal={deal}
            onTrack={toggleTrack}
            onSave={toggleSave}
          />
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
});

export default FeedScreen;
