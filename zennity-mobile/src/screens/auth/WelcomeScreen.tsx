import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import { Button } from '@components/common/Button';
import { Theme } from '@constants/theme';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Logo/Icon */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>💳</Text>
          <Text style={styles.appName}>Zennity</Text>
          <Text style={styles.tagline}>Never Miss a Deal</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🎯</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Track Deals</Text>
              <Text style={styles.featureDesc}>
                Never miss hot credit card offers and bonuses
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>💰</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Maximize Rewards</Text>
              <Text style={styles.featureDesc}>
                Calculate the best stacking combinations
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📊</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Manage Cards</Text>
              <Text style={styles.featureDesc}>
                Keep track of all your credit cards in one place
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom CTA */}
      <View style={styles.bottom}>
        <Button
          title="Get Started"
          onPress={onGetStarted}
          variant="primary"
          fullWidth
        />
        <Text style={styles.disclaimer}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Theme.layout.screenPadding,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing['4xl'],
  },
  logo: {
    fontSize: 80,
    marginBottom: Theme.spacing.md,
  },
  appName: {
    fontSize: Theme.fontSizes['4xl'],
    fontWeight: '700',
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.sm,
  },
  tagline: {
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.textSecondary,
  },
  featuresContainer: {
    gap: Theme.spacing.xl,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Theme.spacing.lg,
  },
  featureIcon: {
    fontSize: 32,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: Theme.fontSizes.xl,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.textSecondary,
    lineHeight: 20,
  },
  bottom: {
    paddingHorizontal: Theme.layout.screenPadding,
    paddingBottom: Theme.spacing.xl,
  },
  disclaimer: {
    fontSize: Theme.fontSizes.xs,
    color: Theme.colors.textTertiary,
    textAlign: 'center',
    marginTop: Theme.spacing.md,
    lineHeight: 16,
  },
});

export default WelcomeScreen;
