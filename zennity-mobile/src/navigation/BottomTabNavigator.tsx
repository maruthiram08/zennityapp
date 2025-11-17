import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from './types';
import { Theme } from '@constants/theme';

// Import screens (we'll create these)
import FeedScreen from '@screens/FeedScreen';
import CardsScreen from '@screens/CardsScreen';
import OffersScreen from '@screens/OffersScreen';
import TrackerScreen from '@screens/TrackerScreen';
import ProfileScreen from '@screens/ProfileScreen';
import { AdminNavigator } from './AdminNavigator';

const Tab = createBottomTabNavigator<RootTabParamList>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: Theme.fontSizes.xs,
          fontWeight: '500',
        },
        tabBarStyle: {
          height: Theme.layout.bottomNavHeight,
          paddingBottom: 10,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: Theme.colors.border,
        },
        headerStyle: {
          backgroundColor: Theme.colors.background,
        },
        headerTitleStyle: {
          fontSize: Theme.fontSizes['4xl'],
          fontWeight: '700',
        },
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>💳</Text>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Offers"
        component={OffersScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏷️</Text>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={TrackerScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>✅</Text>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>⚙️</Text>,
          headerShown: false,
          tabBarLabel: 'Admin',
        }}
      />
    </Tab.Navigator>
  );
};
