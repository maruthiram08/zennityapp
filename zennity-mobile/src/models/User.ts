/**
 * User Model
 * Represents app user data
 */

export enum AuthProvider {
  EMAIL = 'email',
  PHONE = 'phone',
  GOOGLE = 'google',
  APPLE = 'apple',
}

export interface User {
  id: string;
  email?: string;
  phone?: string;
  displayName?: string;
  photoURL?: string;

  // Authentication
  authProvider: AuthProvider;
  emailVerified?: boolean;
  phoneVerified?: boolean;

  // Preferences
  preferences: UserPreferences;

  // Metadata
  createdAt: Date;
  lastLoginAt?: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  // Notifications
  pushNotificationsEnabled: boolean;
  emailNotificationsEnabled: boolean;
  dealAlerts: boolean;
  trackerReminders: boolean;
  weeklyDigest: boolean;

  // Display
  currency: 'INR' | 'USD';
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY';

  // Privacy
  analyticsEnabled: boolean;
  shareUsageData: boolean;

  // Feed customization
  defaultDealFilter?: string;
  favoriteCategories?: string[];
  hiddenDealTypes?: string[];
}

export interface UserStats {
  userId: string;
  totalCards: number;
  totalDealsTracked: number;
  totalDealsSaved: number;
  totalRewardsEarned?: number;
  memberSince: Date;
}
