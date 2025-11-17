/**
 * Calculator Model
 * For stacking calculator feature
 */

export enum MerchantCategory {
  ECOMMERCE = 'ecommerce',
  GROCERY = 'grocery',
  DINING = 'dining',
  TRAVEL = 'travel',
  FUEL = 'fuel',
  UTILITIES = 'utilities',
  ENTERTAINMENT = 'entertainment',
  SHOPPING = 'shopping',
  OTHER = 'other',
}

export interface CalculatorInput {
  amount: number;
  merchantCategory: MerchantCategory;
  merchant?: string;
  selectedCardId?: string;
}

export interface StackingStep {
  id: string;
  stepNumber: number;
  action: string;
  description: string;
  value: number; // Savings amount
  percentage: number; // Percentage of original amount
  type: 'portal' | 'card' | 'gift_card' | 'cashback' | 'bonus';
  cardId?: string;
  portal?: string;
}

export interface CalculatorResult {
  id: string;
  input: CalculatorInput;

  // Primary recommendation
  totalSavings: number;
  totalPercentage: number;
  steps: StackingStep[];

  // Alternative options
  alternatives?: AlternativeOption[];

  // Metadata
  calculatedAt: Date;
  complexity: 'simple' | 'moderate' | 'complex';
}

export interface AlternativeOption {
  id: string;
  name: string;
  description: string;
  totalSavings: number;
  percentage: number;
  complexity: 'easiest' | 'simpler' | 'quick';
  steps: StackingStep[];
}

export interface PortalBonus {
  portal: string;
  category: MerchantCategory;
  bonusPercentage: number;
  maxCashback?: number;
  validUntil?: Date;
}

export interface CardReward {
  cardId: string;
  category: MerchantCategory;
  rewardRate: number; // e.g., 1.5 for 1.5%
  multiplier?: number; // e.g., 10 for 10X
  maxReward?: number;
  conditions?: string[];
}
