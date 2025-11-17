/**
 * Credit Card Model
 * Represents a user's credit card
 */

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
  RUPAY = 'rupay',
  AMEX = 'amex',
  DINERS = 'diners',
}

export interface Card {
  id: string;
  name: string; // e.g., "HDFC Regalia"
  displayName?: string; // e.g., "HDFC Regalia Credit Card"
  bankName: string; // e.g., "HDFC Bank"

  // Card details
  tier: CardTier;
  network: CardNetwork;
  cardType: string; // e.g., "Premium Rewards Card"

  // Visual
  gradientColors?: string[]; // For card display
  imageUrl?: string;

  // Fees & limits
  annualFee: number;
  feeWaiver?: string; // Conditions for fee waiver
  creditLimit?: number;

  // Important dates
  issueDate?: Date;
  expiryDate?: Date;
  feeNextDue?: Date;
  feeDaysRemaining?: number;

  // Benefits
  rewardsRate?: string; // e.g., "1% on all spends"
  benefits?: string[];
  loungeAccess?: boolean;
  loungeVisitsPerYear?: number;

  // Offers
  activeOffersCount: number;

  // User metadata
  isActive: boolean;
  isWatching?: boolean;
  isPrimary?: boolean;

  // Notes
  notes?: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface CardOffer {
  id: string;
  cardId: string;
  title: string;
  description: string;
  value: string;
  expiryDate?: Date;
  daysLeft?: number;
  isActive: boolean;
  category?: string;
  terms?: string[];
}

export interface CardSpending {
  cardId: string;
  month: string; // e.g., "2024-11"
  totalSpent: number;
  categoryBreakdown?: {
    category: string;
    amount: number;
  }[];
  rewardsEarned?: number;
}
