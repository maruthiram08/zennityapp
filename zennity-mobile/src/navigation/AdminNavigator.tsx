import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AdminStackParamList } from './types'
import {
  AdminDashboardScreen,
  ContentListScreen,
  ContentEditorScreen,
} from '@screens/admin'
import { Theme } from '@constants/theme'

const Stack = createNativeStackNavigator<AdminStackParamList>()

/**
 * Admin Navigator
 * Navigation stack for admin content management screens
 */
export const AdminNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.colors.surface,
        },
        headerTintColor: Theme.colors.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{
          title: 'Admin Portal',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="ContentList"
        component={ContentListScreen}
        options={{
          title: 'Content List',
        }}
      />
      <Stack.Screen
        name="ContentEditor"
        component={ContentEditorScreen}
        options={({ route }) => ({
          title: route.params?.mode === 'edit' ? 'Edit Content' : 'Create Content',
        })}
      />
    </Stack.Navigator>
  )
}
