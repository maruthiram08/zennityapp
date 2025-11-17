import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Switch } from 'react-native';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Theme } from '@constants/theme';

const ProfileScreen = () => {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [dealAlerts, setDealAlerts] = React.useState(true);
  const [weeklyDigest, setWeeklyDigest] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info */}
        <Card>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Card Enthusiast</Text>
              <Text style={styles.userEmail}>user@example.com</Text>
            </View>
          </View>
        </Card>

        {/* Stats */}
        <Text style={styles.sectionTitle}>📊 Your Stats</Text>
        <Card>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Cards</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Tracking</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Saved Deals</Text>
            </View>
          </View>
        </Card>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>🔔 Notifications</Text>
        <Card>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingDesc}>Receive app notifications</Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ true: Theme.colors.primary }}
            />
          </View>

          <View style={[styles.settingRow, styles.settingRowBorder]}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Deal Alerts</Text>
              <Text style={styles.settingDesc}>Hot deals and expiring offers</Text>
            </View>
            <Switch
              value={dealAlerts}
              onValueChange={setDealAlerts}
              trackColor={{ true: Theme.colors.primary }}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Weekly Digest</Text>
              <Text style={styles.settingDesc}>Summary of best deals</Text>
            </View>
            <Switch
              value={weeklyDigest}
              onValueChange={setWeeklyDigest}
              trackColor={{ true: Theme.colors.primary }}
            />
          </View>
        </Card>

        {/* Account */}
        <Text style={styles.sectionTitle}>⚙️ Account</Text>
        <Card compact>
          <Text style={styles.menuItem}>Edit Profile</Text>
        </Card>
        <Card compact>
          <Text style={styles.menuItem}>Privacy Settings</Text>
        </Card>
        <Card compact>
          <Text style={styles.menuItem}>Help & Support</Text>
        </Card>
        <Card compact>
          <Text style={styles.menuItem}>About Zennity</Text>
        </Card>

        <Button
          title="Sign Out"
          onPress={() => {}}
          variant="secondary"
          fullWidth
          style={styles.signOutButton}
        />

        <Text style={styles.version}>Version 1.0.0</Text>
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Theme.colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.lg,
  },
  avatarText: {
    fontSize: 32,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: Theme.fontSizes.xl,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.textSecondary,
  },
  sectionTitle: {
    fontSize: Theme.fontSizes.xl,
    fontWeight: '600',
    marginTop: Theme.spacing['2xl'],
    marginBottom: Theme.spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Theme.fontSizes['3xl'],
    fontWeight: '700',
    color: Theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.textSecondary,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
  },
  settingRowBorder: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Theme.colors.borderLight,
  },
  settingInfo: {
    flex: 1,
    marginRight: Theme.spacing.md,
  },
  settingTitle: {
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.textSecondary,
  },
  menuItem: {
    fontSize: Theme.fontSizes.md,
    fontWeight: '500',
  },
  signOutButton: {
    marginTop: Theme.spacing['3xl'],
  },
  version: {
    textAlign: 'center',
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.textTertiary,
    marginTop: Theme.spacing.xl,
  },
});

export default ProfileScreen;
