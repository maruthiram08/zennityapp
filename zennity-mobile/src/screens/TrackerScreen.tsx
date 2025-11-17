import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Card } from '@components/common/Card';
import { Badge } from '@components/common/Badge';
import { Button } from '@components/common/Button';
import { ProgressBar } from '@components/common/ProgressBar';
import { useTrackerStore } from '@store';
import { Theme } from '@constants/theme';

const TrackerScreen = () => {
  const { trackerItems, upcomingActions } = useTrackerStore();
  const [activeTab, setActiveTab] = useState<'active' | 'calendar' | 'portfolio'>('active');

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'ready':
        return 'welcome';
      case 'action_needed':
        return 'hot';
      default:
        return 'welcome';
    }
  };

  const getDaysColor = (days?: number) => {
    if (!days) return Theme.colors.textSecondary;
    if (days <= 2) return Theme.colors.error;
    if (days <= 7) return Theme.colors.warning;
    return Theme.colors.success;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>My Tracker</Text>
      </View>

      <View style={styles.tabContainer}>
        <View style={styles.tabSwitcher}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'active' && styles.tabActive]}
            onPress={() => setActiveTab('active')}
          >
            <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'calendar' && styles.tabActive]}
            onPress={() => setActiveTab('calendar')}
          >
            <Text style={[styles.tabText, activeTab === 'calendar' && styles.tabTextActive]}>
              Calendar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'portfolio' && styles.tabActive]}
            onPress={() => setActiveTab('portfolio')}
          >
            <Text style={[styles.tabText, activeTab === 'portfolio' && styles.tabTextActive]}>
              Portfolio
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>🎯 Active Deals ({trackerItems.length})</Text>

        {trackerItems.map(item => (
          <Card key={item.id}>
            <View style={styles.trackerHeader}>
              <Text style={styles.trackerTitle}>{item.title}</Text>
              <Text style={[styles.daysLeft, { color: getDaysColor(item.daysRemaining) }]}>
                {item.daysRemaining} days left
              </Text>
            </View>

            <ProgressBar progress={item.progress.percentage} style={styles.progressBar} />

            <Text style={styles.progressText}>
              {item.progress.current} of {item.progress.target} {item.progress.unit} complete
            </Text>
          </Card>
        ))}

        <Text style={styles.sectionTitle}>📅 Upcoming Actions</Text>

        {upcomingActions.map(action => (
          <Card key={action.id} compact>
            <View style={styles.actionRow}>
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDate}>{action.description}</Text>
              </View>
              <Badge
                text={action.status === 'ready' ? 'Ready Soon' : 'Action Needed'}
                variant={getStatusBadgeVariant(action.status)}
              />
            </View>
          </Card>
        ))}

        <Button
          title="+ Add New Goal"
          onPress={() => {}}
          variant="primary"
          fullWidth
          style={styles.addButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const TouchableOpacity = require('react-native').TouchableOpacity;

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
  tabContainer: {
    paddingHorizontal: Theme.layout.screenPadding,
    marginBottom: Theme.spacing.lg,
  },
  tabSwitcher: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.md,
    padding: 4,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: 6,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Theme.colors.primary,
  },
  tabText: {
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
    color: Theme.colors.textSecondary,
  },
  tabTextActive: {
    color: Theme.colors.textWhite,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Theme.layout.screenPadding,
    paddingBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: Theme.fontSizes.xl,
    fontWeight: '600',
    marginTop: Theme.spacing['2xl'],
    marginBottom: Theme.spacing.md,
  },
  trackerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  trackerTitle: {
    fontSize: Theme.fontSizes.lg,
    fontWeight: '600',
    flex: 1,
  },
  daysLeft: {
    fontSize: Theme.fontSizes.sm,
    fontWeight: '600',
  },
  progressBar: {
    marginVertical: Theme.spacing.sm,
  },
  progressText: {
    fontSize: Theme.fontSizes.base,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionInfo: {
    flex: 1,
    marginRight: Theme.spacing.md,
  },
  actionTitle: {
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionDate: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.textTertiary,
  },
  addButton: {
    marginTop: Theme.spacing.lg,
  },
});

export default TrackerScreen;
