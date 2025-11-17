import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { useAuthStore } from './src/store';
import { Theme } from './src/constants/theme';

export default function App() {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate initial loading (check persisted auth state, etc.)
    const initialize = async () => {
      try {
        // Here you would check AsyncStorage for persisted auth
        // For now, just simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setIsReady(true);
      }
    };

    initialize();
  }, []);

  const handleAuthComplete = () => {
    // Auth complete - will automatically show main app due to isAuthenticated
    console.log('✅ Authentication complete');
  };

  // Show loading spinner while initializing
  if (!isReady || isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {isAuthenticated ? (
        <RootNavigator />
      ) : (
        <AuthNavigator onAuthComplete={handleAuthComplete} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
});
