/**
 * Content Management Models
 * Defines all content types that can be managed through the admin portal
 */

// Base interface for all content types
export interface BaseContent {
  id: string
  type: ContentType
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  priority: number // For sorting/featuring content
}

export enum ContentType {
  SPEND_OFFER = 'SPEND_OFFER',
  LTF_CARD = 'LTF_CARD',
  PREMIUM_CAMPAIGN = 'PREMIUM_CAMPAIGN',
  STACKING_HACK = 'STACKING_HACK',
  TRANSFER_BONUS = 'TRANSFER_BONUS',
  STATUS_OFFER = 'STATUS_OFFER',
}

// Type 1: Spend Offers 💰
export interface SpendOffer extends BaseContent {
  type: ContentType.SPEND_OFFER
  // Show fields
  cardName: string
  bankName: string
  reward: {
    amount: number
    currency: 'INR' | 'USD'
    type: 'voucher' | 'cashback' | 'points'
    description: string // e.g., "₹500 voucher"
  }
  spendRequired: {
    amount: number
    currency: 'INR' | 'USD'
    description: string // e.g., "₹5K"
  }
  expiryDate?: Date
  daysLeft?: number
  difficulty: 'Easy' | 'Medium' | 'Hard'

  // Hide fields (for details page)
  requirements: {
    step: number
    description: string
  }[]
  registrationDetails: string
  finePrint: string[]
}

// Type 2: LTF Cards 🎁
export interface LTFCard extends BaseContent {
  type: ContentType.LTF_CARD
  // Show fields
  cardName: string
  bankName: string
  isLifetimeFree: boolean
  mainBenefit: string // e.g., "5% on Flipkart"
  ctaText: string // e.g., "Apply Free"
  ctaUrl?: string
  imageUrl?: string

  // Hide fields (for details page)
  benefits: {
    id: string
    title: string
    description: string
    icon?: string
  }[]
  zeroFeeExplanation: string
  eligibilityCriteria: string[]
  termsAndConditions: string[]
}

// Type 3: Premium Campaigns ⭐
export interface PremiumCampaign extends BaseContent {
  type: ContentType.PREMIUM_CAMPAIGN
  // Show fields
  cardName: string
  bankName: string
  mainOffer: string // e.g., "50% off upgrade"
  offerPercentage?: number
  keyBenefitVisual: string // URL or description
  isPremium: boolean
  imageUrl?: string

  // Hide fields (for details page)
  benefits: {
    id: string
    title: string
    description: string
    icon?: string
  }[] // 4 benefits grid
  warningNotes: string[]
  calculations: {
    label: string
    formula: string
    result: string
  }[]
  eligibility: string[]
  applicationUrl?: string
}

// Type 4: Stacking Hacks 🎯
export interface StackingHack extends BaseContent {
  type: ContentType.STACKING_HACK
  // Show fields
  stackName: string
  finalPercentage: number
  numberOfSteps: number
  isProTip: boolean
  category?: string // e.g., "E-commerce", "Travel", "Dining"

  // Hide fields (for details page)
  steps: {
    stepNumber: number
    title: string
    description: string
    percentageContribution: number
    tips?: string[]
  }[]
  calculationBreakdown: {
    step: string
    value: number
    calculation: string
  }[]
  requiredCards: string[]
  requiredAccounts: string[]
  estimatedValue: {
    amount: number
    currency: 'INR' | 'USD'
    description: string
  }
  examples: {
    scenario: string
    calculation: string
    result: string
  }[]
}

// Type 5: Transfer Bonus ✈️
export interface TransferBonus extends BaseContent {
  type: ContentType.TRANSFER_BONUS
  // Show fields
  fromProgram: string // e.g., "HSBC"
  toProgram: string // e.g., "Marriott"
  bonusPercentage: number // e.g., 40
  expiryDate?: Date
  daysLeft?: number
  transferRoute: string // e.g., "HSBC → Marriott"
  visualUrl?: string

  // Hide fields (for details page)
  exampleCalculations: {
    pointsTransferred: number
    bonusPoints: number
    totalPoints: number
    valueEstimate: {
      amount: number
      currency: 'INR' | 'USD'
    }
  }[]
  detailedTerms: string[]
  transferSteps: {
    step: number
    description: string
    timeRequired?: string
  }[]
  limitations: string[]
  bestUses: string[]
}

// Type 6: Status Offers 👑
export interface StatusOffer extends BaseContent {
  type: ContentType.STATUS_OFFER
  // Show fields
  statusName: string // e.g., "Marriott Gold"
  programName: string // e.g., "Marriott Bonvoy"
  cardRequired: string // e.g., "Amex Platinum"
  isInstant: boolean
  keyBenefit: string // e.g., "25% bonus points"
  statusTier: 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Other'

  // Hide fields (for details page)
  fullBenefits: {
    id: string
    title: string
    description: string
    category: 'Earning' | 'Redemption' | 'Experience' | 'Other'
  }[]
  enrollmentSteps: {
    step: number
    title: string
    description: string
    estimatedTime?: string
  }[]
  requirements: string[]
  matchingDetails?: {
    originalStatus?: string
    matchedStatus: string
    duration?: string
  }
  valuationExamples: {
    benefit: string
    estimatedValue: number
    currency: 'INR' | 'USD'
  }[]
}

// Union type for all content
export type Content =
  | SpendOffer
  | LTFCard
  | PremiumCampaign
  | StackingHack
  | TransferBonus
  | StatusOffer

// Filter and search interfaces
export interface ContentFilter {
  type?: ContentType
  isActive?: boolean
  searchQuery?: string
  sortBy?: 'createdAt' | 'updatedAt' | 'priority'
  sortOrder?: 'asc' | 'desc'
}

// For admin statistics
export interface ContentStats {
  total: number
  byType: {
    [key in ContentType]: number
  }
  active: number
  inactive: number
}
