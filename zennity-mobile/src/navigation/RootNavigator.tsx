/**
 * Root Navigator - Main stack navigator with bottom tabs and modal screens
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import OffersManagementScreen from '@screens/OffersManagementScreen';
import { RootStackParamList } from './types';
import { Theme } from '@constants/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen
        name="OffersManagement"
        component={OffersManagementScreen}
        options={{
          headerShown: true,
          title: 'Offer Management',
          headerStyle: {
            backgroundColor: Theme.colors.background,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
          },
          headerShadowVisible: false,
          presentation: 'card',
        }}
      />
    </Stack.Navigator>
  );
};
