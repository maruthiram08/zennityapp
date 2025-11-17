/**
 * Types for Zennity Admin Portal
 * Matches the mobile app's data structures
 */

export enum DealType {
  HOT = 'hot',
  TRANSFER = 'transfer',
  WELCOME = 'welcome',
  STACKING = 'stacking',
  BANK_BONUS = 'bank_bonus',
  MILES_SALE = 'miles_sale',
}

export enum DealCategory {
  ALL = 'all',
  SPEND = 'spend',
  TRANSFER = 'transfer',
  WELCOME = 'welcome',
}

export enum DealComplexity {
  EASY = 'easy',
  MODERATE = 'moderate',
  COMPLEX = 'complex',
}

export interface DealRequirement {
  id: string;
  description: string;
  completed?: boolean;
}

export interface Deal {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  type: DealType;
  category: DealCategory;
  complexity?: DealComplexity;
  value: string;
  rewardAmount?: number;
  expiryDate?: Date;
  daysLeft?: number;
  validFrom?: Date;
  validUntil?: Date;
  requirements?: DealRequirement[];
  isTracked?: boolean;
  isSaved?: boolean;
  isWatching?: boolean;
  cardId?: string;
  cardName?: string;
  bankName?: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  linkUrl?: string;
  tags?: string[];
}

export enum CardTier {
  BASIC = 'basic',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
  PREMIUM = 'premium',
}

export enum CardNetwork {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  AMEX = 'amex',
  RUPAY = 'rupay',
}

export interface Card {
  id: string;
  name: string;
  displayName: string;
  bankName: string;
  tier: CardTier;
  network: CardNetwork;
  cardType: string;
  gradientColors: [string, string];
  annualFee?: number;
  activeOffersCount?: number;
  feeDaysRemaining?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface User {
  id: string;
  phoneNumber: string;
  displayName?: string;
  email?: string;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export interface DashboardStats {
  totalDeals: number;
  activeDeals: number;
  totalCards: number;
  totalUsers: number;
  dealsThisWeek: number;
  usersThisWeek: number;
}
