import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
  Platform,
  TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DealCard } from '@components/deal/DealCard';
import { FilterChip } from '@components/common/FilterChip';
import { useDealsStore } from '@store';
import { DealCategory } from '@models';
import { Theme } from '@constants/theme';

const FeedScreen = () => {
  const { filteredDeals, activeFilter, setFilter, toggleTrack, toggleSave } = useDealsStore();
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 80],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const filters = [
    { label: '🔥 All', value: DealCategory.ALL },
    { label: '💳 My Cards', value: DealCategory.SPEND },
    { label: '👀 Watching', value: DealCategory.TRANSFER },
    { label: '⏰ Ending Soon', value: DealCategory.WELCOME },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            opacity: headerOpacity
          }
        ]}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Feed</Text>
            <Text style={styles.headerSubtitle}>
              {filteredDeals.length} deals available
            </Text>
          </View>
          <TouchableOpacity style={styles.notificationBadge}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={20}
              color={Theme.colors.background}
            />
            <View style={styles.badgeDot}>
              <Text style={styles.badgeCount}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map(filter => (
          <View key={filter.value} style={styles.chipWrapper}>
            <FilterChip
              label={filter.label}
              active={activeFilter === filter.value}
              onPress={() => setFilter(filter.value)}
            />
          </View>
        ))}
      </ScrollView>

      {filteredDeals.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🎯</Text>
          <Text style={styles.emptyTitle}>No deals found</Text>
          <Text style={styles.emptySubtitle}>
            Try adjusting your filters to see more offers
          </Text>
        </View>
      ) : (
        <Animated.FlatList
          data={filteredDeals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DealCard
              deal={item}
              onTrack={toggleTrack}
              onSave={toggleSave}
            />
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    backgroundColor: Theme.colors.primary,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Theme.colors.background,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.colors.background,
    opacity: 0.9,
  },
  notificationBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Theme.colors.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
  badgeCount: {
    color: Theme.colors.background,
    fontSize: 10,
    fontWeight: '700',
  },
  filterContainer: {
    marginTop: 20,
    marginBottom: 16,
    paddingLeft: 20,
  },
  filterContent: {
    paddingRight: 20,
  },
  chipWrapper: {
    marginRight: 12,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default FeedScreen;
