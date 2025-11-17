/**
 * API Service for Zennity Admin Portal
 * Handles all backend communication
 * Currently uses mock data - replace with real API calls
 */

import { Deal, Card, User, DashboardStats, DealType, DealCategory, DealComplexity, CardTier, CardNetwork } from '../types';

// Mock data for development
const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'HDFC Payzapp ₹500 Voucher',
    subtitle: 'Link card to UPI and make 4 transactions',
    type: DealType.HOT,
    category: DealCategory.SPEND,
    complexity: DealComplexity.EASY,
    value: '~50% Cashback',
    rewardAmount: 50,
    daysLeft: 2,
    requirements: [
      { id: 'r1', description: 'Link card to Payzapp UPI' },
      { id: 'r2', description: 'Min ₹250 per transaction' },
      { id: 'r3', description: 'Valid: Nov 7-30, 2024' },
    ],
    cardId: '1',
    cardName: 'HDFC Regalia',
    bankName: 'HDFC Bank',
    tags: ['verified', 'hot-deal'],
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-15'),
  },
  {
    id: '2',
    title: 'HSBC → Marriott Bonvoy +40%',
    subtitle: 'Transfer points with 40% bonus until Dec 10',
    type: DealType.TRANSFER,
    category: DealCategory.TRANSFER,
    complexity: DealComplexity.MODERATE,
    value: '40% Bonus Points',
    rewardAmount: 40,
    daysLeft: 23,
    requirements: [
      { id: 'r1', description: 'Minimum 1,000 points transfer' },
      { id: 'r2', description: 'Valid until December 10, 2024' },
    ],
    cardName: 'HSBC Platinum',
    bankName: 'HSBC',
    tags: ['verified'],
    createdAt: new Date('2024-11-10'),
    updatedAt: new Date('2024-11-15'),
  },
  {
    id: '3',
    title: 'Amex Gold 90K Points',
    subtitle: 'Elevated offer! Historical high: 90K',
    type: DealType.WELCOME,
    category: DealCategory.WELCOME,
    complexity: DealComplexity.MODERATE,
    value: '90,000 Points',
    requirements: [
      { id: 'r1', description: 'Spend ₹4L in first 3 months' },
      { id: 'r2', description: 'Annual fee: ₹4,500' },
      { id: 'r3', description: 'Bonus: Additional 20K on ₹1L spend' },
    ],
    bankName: 'American Express',
    tags: ['verified', 'best-offer'],
    createdAt: new Date('2024-11-12'),
    updatedAt: new Date('2024-11-15'),
  },
];

const mockCards: Card[] = [
  {
    id: '1',
    name: 'HDFC Regalia',
    displayName: 'HDFC Regalia Credit Card',
    bankName: 'HDFC Bank',
    tier: CardTier.PREMIUM,
    network: CardNetwork.VISA,
    cardType: 'Premium Rewards Card',
    gradientColors: ['#667eea', '#764ba2'],
    annualFee: 2500,
    activeOffersCount: 5,
    feeDaysRemaining: 45,
    isActive: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-11-15'),
    userId: 'user1',
  },
  {
    id: '2',
    name: 'Axis Magnus',
    displayName: 'Axis Bank Magnus Credit Card',
    bankName: 'Axis Bank',
    tier: CardTier.PREMIUM,
    network: CardNetwork.VISA,
    cardType: 'Premium Rewards Card',
    gradientColors: ['#F093FB', '#F5576C'],
    annualFee: 10000,
    activeOffersCount: 3,
    feeDaysRemaining: 280,
    isActive: true,
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-11-15'),
    userId: 'user1',
  },
];

const mockUsers: User[] = [
  {
    id: 'user1',
    phoneNumber: '+919876543210',
    displayName: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-11-17'),
    isActive: true,
  },
  {
    id: 'user2',
    phoneNumber: '+919876543211',
    displayName: 'Jane Smith',
    email: 'jane@example.com',
    createdAt: new Date('2024-02-15'),
    lastLogin: new Date('2024-11-16'),
    isActive: true,
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const api = {
  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    await delay(500);
    return {
      totalDeals: mockDeals.length,
      activeDeals: mockDeals.filter(d => d.daysLeft && d.daysLeft > 0).length,
      totalCards: mockCards.length,
      totalUsers: mockUsers.length,
      dealsThisWeek: 2,
      usersThisWeek: 5,
    };
  },

  // Deals
  async getDeals(): Promise<Deal[]> {
    await delay(500);
    return [...mockDeals];
  },

  async getDeal(id: string): Promise<Deal | null> {
    await delay(300);
    return mockDeals.find(d => d.id === id) || null;
  },

  async createDeal(deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deal> {
    await delay(500);
    const newDeal: Deal = {
      ...deal,
      id: `deal-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockDeals.push(newDeal);
    return newDeal;
  },

  async updateDeal(id: string, updates: Partial<Deal>): Promise<Deal> {
    await delay(500);
    const index = mockDeals.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Deal not found');

    mockDeals[index] = {
      ...mockDeals[index],
      ...updates,
      updatedAt: new Date(),
    };
    return mockDeals[index];
  },

  async deleteDeal(id: string): Promise<void> {
    await delay(500);
    const index = mockDeals.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Deal not found');
    mockDeals.splice(index, 1);
  },

  // Cards
  async getCards(): Promise<Card[]> {
    await delay(500);
    return [...mockCards];
  },

  async getCard(id: string): Promise<Card | null> {
    await delay(300);
    return mockCards.find(c => c.id === id) || null;
  },

  async createCard(card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card> {
    await delay(500);
    const newCard: Card = {
      ...card,
      id: `card-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockCards.push(newCard);
    return newCard;
  },

  async updateCard(id: string, updates: Partial<Card>): Promise<Card> {
    await delay(500);
    const index = mockCards.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Card not found');

    mockCards[index] = {
      ...mockCards[index],
      ...updates,
      updatedAt: new Date(),
    };
    return mockCards[index];
  },

  async deleteCard(id: string): Promise<void> {
    await delay(500);
    const index = mockCards.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Card not found');
    mockCards.splice(index, 1);
  },

  // Users
  async getUsers(): Promise<User[]> {
    await delay(500);
    return [...mockUsers];
  },

  async getUser(id: string): Promise<User | null> {
    await delay(300);
    return mockUsers.find(u => u.id === id) || null;
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    await delay(500);
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');

    mockUsers[index] = {
      ...mockUsers[index],
      ...updates,
    };
    return mockUsers[index];
  },

  async deleteUser(id: string): Promise<void> {
    await delay(500);
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    mockUsers.splice(index, 1);
  },
};
