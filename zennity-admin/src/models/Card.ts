/**
 * Credit Card Model
 * Represents a credit card with metadata
 */

export const CardTier = {
  BASIC: 'basic',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
  PREMIUM: 'premium',
} as const;

export type CardTier = typeof CardTier[keyof typeof CardTier];

export const CardNetwork = {
  VISA: 'visa',
  MASTERCARD: 'mastercard',
  RUPAY: 'rupay',
  AMEX: 'amex',
  DINERS: 'diners',
} as const;

export type CardNetwork = typeof CardNetwork[keyof typeof CardNetwork];

export interface Card {
  id: string;
  name: string;
  displayName?: string;
  bankName: string;
  tier: CardTier;
  network: CardNetwork;
  cardType: string;
  gradientColors?: string[];
  imageUrl?: string;
  annualFee: number;
  feeWaiver?: string;
  creditLimit?: number;
  issueDate?: Date;
  expiryDate?: Date;
  feeNextDue?: Date;
  feeDaysRemaining?: number;
  rewardsRate?: string;
  benefits?: string[];
  loungeAccess?: boolean;
  loungeVisitsPerYear?: number;
  activeOffersCount: number;
  isActive: boolean;
  isWatching?: boolean;
  isPrimary?: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;

  // Dynamic metadata fields
  metadata?: Record<string, any>;
}
