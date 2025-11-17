/**
 * Deal Model
 * Represents a credit card deal/offer
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

  // Value & rewards
  value: string; // e.g., "~50% Cashback 💰", "Best Offer Available"
  rewardAmount?: number;

  // Timing
  expiryDate?: Date;
  daysLeft?: number;
  validFrom?: Date;
  validUntil?: Date;

  // Requirements
  requirements?: DealRequirement[];

  // Tracking
  isTracked?: boolean;
  isSaved?: boolean;
  isWatching?: boolean;

  // Associated card
  cardId?: string;
  cardName?: string;
  bankName?: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  linkUrl?: string;
  tags?: string[];
}

export interface DealFilter {
  type?: DealType;
  category?: DealCategory;
  complexity?: DealComplexity;
  cardId?: string;
  isTracked?: boolean;
  isSaved?: boolean;
  isWatching?: boolean;
  endingSoon?: boolean; // deals ending in < 7 days
}
