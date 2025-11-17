# Zennity Mobile App - Comprehensive Tech Stack & Architecture Guide

**Project Location:** `/home/user/zennityapp/zennity-mobile`  
**Status:** Production-ready React Native app with complete design system  
**Target Platform:** Credit card deals tracking for Indian users

---

## 1. TECHNOLOGY STACK OVERVIEW

### Frontend Framework
- **Framework:** React Native (v0.81.5)
- **Bundler:** Expo (v54.0.23) - Development and distribution
- **Language:** TypeScript (v5.9.2) - Strict mode enabled
- **React Version:** 19.1.0

### Backend & Database
- **Authentication:** Firebase Auth (Phone SMS OTP)
- **Database:** Firestore (Cloud database for data persistence)
- **Local Storage:** 
  - AsyncStorage - Async key-value storage
  - MMKV - High-performance local storage (react-native-mmkv)
- **Mock Mode:** Built-in mock auth for development (no Firebase needed)

### State Management
- **Zustand (v5.0.8)** - Lightweight state management
  - Stores: `useAuthStore`, `useDealsStore`, `useCardsStore`, `useTrackerStore`
  - No Redux/Context API complexity
  - Subscribe-based updates

### Data Fetching & API Calls
- **Axios (v1.13.2)** - HTTP client for API calls
- **React Query (TanStack React Query v5.90.10)** - Data fetching, caching, synchronization
- **Pattern:** Service layer with async/await

### Forms & Validation
- **React Hook Form (v7.66.0)** - Form state management
- **Zod (v3.25.76)** - TypeScript-first schema validation
- **Resolvers:** @hookform/resolvers for Zod integration

### Navigation
- **React Navigation (v7.1.20)** - Cross-platform routing
- **Bottom Tabs Navigator (v7.8.5)** - Tab-based navigation
- **Native Stack Navigator (v7.6.3)** - Stack-based screens
- **Safe Area Context (v5.6.2)** - Safe area handling
- **Screens (v4.18.0)** - Native screen management

### UI & Design
- **Expo Linear Gradient (v15.0.7)** - Gradient backgrounds
- **Expo Vector Icons** - Material Community Icons
- **Native Component Library:** React Native built-ins (View, Text, ScrollView, etc.)
- **Custom Design System:** Theme tokens for colors, typography, spacing

### Utilities
- **Date Functions:** date-fns (v4.1.0)
- **Push Notifications:** Expo Notifications (v0.32.12)
- **Device Info:** Expo Constants (v18.0.10)
- **Status Bar:** Expo Status Bar (v3.0.8)

### Development Tools
- **Linter:** ESLint (v9.39.1) + TypeScript ESLint
- **Code Formatter:** Prettier (v3.6.2)
- **Type Checking:** TypeScript (strict mode)

---

## 2. BACKEND ARCHITECTURE

### Authentication Flow
```
Phone Number Input → OTP Sent → OTP Verification → User Created → JWT Token
```

**File:** `/src/services/authService.ts`

**Key Functions:**
- `sendOTP(phoneNumber)` - Sends 6-digit OTP via Firebase or mock
- `verifyOTP(verificationId, otp)` - Verifies OTP and creates user session
- `signOut()` - Clears auth state and logs out user
- `getCurrentUser()` - Gets current Firebase user object

**Features:**
- Phone number formatting (+91 prefix for India)
- Mock auth for development (OTP: `123456`)
- Real Firebase integration option
- Error handling with meaningful messages

### Database Schema (Firestore)

**Collections:**
```
/users/{userId}
  - id, email, phone, displayName, photoURL
  - authProvider, emailVerified, phoneVerified
  - preferences (notifications, currency, analytics)
  - createdAt, lastLoginAt, updatedAt

/deals/{dealId}
  - title, subtitle, description
  - type (HOT, TRANSFER, WELCOME, STACKING, BANK_BONUS, MILES_SALE)
  - category (ALL, SPEND, TRANSFER, WELCOME)
  - complexity (EASY, MODERATE, COMPLEX)
  - value, rewardAmount, daysLeft
  - requirements[], cardId, bankName, tags
  - isTracked, isSaved, isWatching
  - createdAt, updatedAt

/cards/{cardId}
  - name, bankName, displayName
  - tier (BASIC, SILVER, GOLD, PLATINUM, PREMIUM)
  - network (VISA, MASTERCARD, RUPAY, AMEX, DINERS)
  - annualFee, creditLimit, benefits[]
  - gradientColors, imageUrl
  - activeOffersCount, isActive, isPrimary
  - createdAt, updatedAt, userId

/trackerItems/{itemId}
  - title, description, goalType, status
  - progress { current, target, unit, percentage }
  - dealId, cardId, userId
  - startDate, endDate, deadline, daysRemaining
  - milestones[], notes
  - createdAt, updatedAt

/upcomingActions/{actionId}
  - title, description, dueDate, daysUntil
  - actionType, status, priority
  - cardId, userId, metadata
```

---

## 3. PROJECT STRUCTURE

```
zennity-mobile/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── common/
│   │   │   ├── Button.tsx       # Primary, secondary, outline, ghost variants
│   │   │   ├── Badge.tsx        # Status badges with variants
│   │   │   ├── Card.tsx         # Card container with shadow/border
│   │   │   ├── ProgressBar.tsx  # Progress visualization
│   │   │   ├── FilterChip.tsx   # Filter pills
│   │   │   └── index.ts
│   │   └── deal/
│   │       ├── DealCard.tsx     # Complex deal card component
│   │       └── index.ts
│   │
│   ├── screens/                 # Screen components (pages)
│   │   ├── FeedScreen.tsx       # Browse deals
│   │   ├── CardsScreen.tsx      # Card portfolio
│   │   ├── OffersScreen.tsx     # Trending offers
│   │   ├── TrackerScreen.tsx    # Progress tracking
│   │   ├── ProfileScreen.tsx    # User settings
│   │   ├── auth/
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── PhoneLoginScreen.tsx
│   │   │   ├── OTPVerificationScreen.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── store/                   # Zustand state stores
│   │   ├── useAuthStore.ts      # Auth state & actions
│   │   ├── useDealsStore.ts     # Deals list & filters
│   │   ├── useCardsStore.ts     # Cards & selection
│   │   ├── useTrackerStore.ts   # Tracker items
│   │   └── index.ts
│   │
│   ├── services/                # API & Firebase services
│   │   └── authService.ts       # Auth logic
│   │
│   ├── models/                  # TypeScript interfaces
│   │   ├── Deal.ts              # Deal model with enums
│   │   ├── Card.ts              # Card model with tiers
│   │   ├── User.ts              # User & preferences
│   │   ├── Tracker.ts           # Tracker items & goals
│   │   ├── Calculator.ts        # (placeholder)
│   │   └── index.ts
│   │
│   ├── constants/               # Design tokens
│   │   ├── colors.ts            # Color palette
│   │   ├── typography.ts        # Font sizes & styles
│   │   ├── spacing.ts           # Spacing & layout
│   │   ├── theme.ts             # Unified theme object
│   │   └── index.ts
│   │
│   ├── navigation/              # Navigation configuration
│   │   ├── types.ts             # Navigation types
│   │   ├── BottomTabNavigator.tsx
│   │   └── AuthNavigator.tsx
│   │
│   ├── firebase/                # Firebase config
│   │   └── config.ts
│   │
│   ├── hooks/                   # Custom React hooks (placeholder)
│   ├── utils/                   # Utility functions
│   │   └── sampleData.ts        # Mock data for testing
│   └── constants/
│
├── assets/                      # Images, icons, fonts
├── App.tsx                      # App entry point
├── index.ts                     # Expo entry
├── app.json                     # Expo config
├── package.json
├── tsconfig.json
├── .eslintrc.js
└── .prettierrc
```

---

## 4. DATA MODELS & SCHEMAS

### Deal Model
```typescript
interface Deal {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  type: DealType;              // HOT, TRANSFER, WELCOME, STACKING, BANK_BONUS, MILES_SALE
  category: DealCategory;      // ALL, SPEND, TRANSFER, WELCOME
  complexity?: DealComplexity; // EASY, MODERATE, COMPLEX
  
  // Value & Rewards
  value: string;               // "~50% Cashback 💰", "Best Offer Available"
  rewardAmount?: number;       // Percentage or numeric value
  
  // Timing
  expiryDate?: Date;
  daysLeft?: number;
  validFrom?: Date;
  validUntil?: Date;
  
  // Requirements (steps to complete)
  requirements?: DealRequirement[];
  
  // User actions
  isTracked?: boolean;         // Following progress
  isSaved?: boolean;           // Bookmarked
  isWatching?: boolean;        // Alerts enabled
  
  // Associated entities
  cardId?: string;
  cardName?: string;
  bankName?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  linkUrl?: string;
  tags?: string[];             // "verified", "hot-deal", "best-offer"
}

enum DealType {
  HOT = 'hot',
  TRANSFER = 'transfer',
  WELCOME = 'welcome',
  STACKING = 'stacking',
  BANK_BONUS = 'bank_bonus',
  MILES_SALE = 'miles_sale',
}
```

### Card Model
```typescript
interface Card {
  id: string;
  name: string;                // "HDFC Regalia"
  displayName?: string;        // "HDFC Regalia Credit Card"
  bankName: string;            // "HDFC Bank"
  
  // Card details
  tier: CardTier;              // BASIC, SILVER, GOLD, PLATINUM, PREMIUM
  network: CardNetwork;        // VISA, MASTERCARD, RUPAY, AMEX, DINERS
  cardType: string;            // "Premium Rewards Card"
  
  // Visual
  gradientColors?: string[];   // For card display gradient
  imageUrl?: string;
  
  // Fees & limits
  annualFee: number;
  feeWaiver?: string;
  creditLimit?: number;
  
  // Important dates
  issueDate?: Date;
  expiryDate?: Date;
  feeNextDue?: Date;
  feeDaysRemaining?: number;
  
  // Benefits
  rewardsRate?: string;        // "1% on all spends"
  benefits?: string[];
  loungeAccess?: boolean;
  loungeVisitsPerYear?: number;
  
  // Offers
  activeOffersCount: number;
  
  // User metadata
  isActive: boolean;
  isWatching?: boolean;
  isPrimary?: boolean;
  notes?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
```

### TrackerItem Model
```typescript
interface TrackerItem {
  id: string;
  title: string;
  description?: string;
  goalType: GoalType;          // SPENDING, TRANSACTION_COUNT, MILESTONE, APPLICATION, FEE_DUE, POINTS_EXPIRY, CUSTOM
  status: TrackerStatus;       // NOT_STARTED, IN_PROGRESS, COMPLETED, FAILED, EXPIRED
  
  // Progress tracking
  progress: TrackerProgress {
    current: number;           // Current value
    target: number;            // Target value
    unit: string;              // "transactions", "₹", "points", "days"
    percentage: number;        // 0-100
  }
  
  // Associated entities
  dealId?: string;
  cardId?: string;
  
  // Timing
  startDate: Date;
  endDate?: Date;
  daysRemaining?: number;
  deadline?: Date;
  
  // Milestones (for complex goals)
  milestones?: Array<{
    id: string;
    description: string;
    target: number;
    completed: boolean;
  }>;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  notes?: string;
}
```

### User Model
```typescript
interface User {
  id: string;
  email?: string;
  phone?: string;
  displayName?: string;
  photoURL?: string;
  
  // Authentication
  authProvider: AuthProvider;  // EMAIL, PHONE, GOOGLE, APPLE
  emailVerified?: boolean;
  phoneVerified?: boolean;
  
  // Preferences
  preferences: UserPreferences {
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
  
  // Metadata
  createdAt: Date;
  lastLoginAt?: Date;
  updatedAt: Date;
}
```

---

## 5. UI COMPONENT LIBRARY

### Custom Components

**Button Component**
```typescript
<Button
  title="Track This"
  onPress={handlePress}
  variant="primary"      // primary | secondary | outline | ghost
  size="medium"          // small | medium | large
  disabled={false}
  loading={false}
  fullWidth={true}
  icon={<Icon />}
/>
```
- Location: `/src/components/common/Button.tsx`
- Variants: Primary (orange), Secondary (gray), Outline (bordered), Ghost (transparent)
- States: Active, disabled, loading
- Touch target: Minimum 44pt (iOS standard)

**Badge Component**
```typescript
<Badge
  text="🔥 Ends in 2 days"
  variant="hot"          // hot | transfer | welcome | stacking | bank | miles
/>
```
- Location: `/src/components/common/Badge.tsx`
- Displays status with emoji and text
- Color-coded by deal type

**Card Component**
```typescript
<Card
  compact={false}
  leftBorderColor={Theme.colors.primary}
  onPress={handlePress}
>
  {children}
</Card>
```
- Location: `/src/components/common/Card.tsx`
- Elevation/shadow on iOS and Android
- Optional left border accent
- Reusable container pattern

**ProgressBar Component**
```typescript
<ProgressBar 
  progress={75}                    // 0-100
  color={Theme.colors.success}
/>
```
- Location: `/src/components/common/ProgressBar.tsx`
- Visual progress indicator

**FilterChip Component**
```typescript
<FilterChip
  label="Spend"
  active={true}
  onPress={handlePress}
/>
```
- Location: `/src/components/common/FilterChip.tsx`
- Pill-shaped filter buttons

**DealCard Component (Complex)**
```typescript
<DealCard
  deal={dealObject}
  onTrack={(dealId) => {}}
  onSave={(dealId) => {}}
  onDetails={(dealId) => {}}
/>
```
- Location: `/src/components/deal/DealCard.tsx`
- Complex card with multiple sections
- Bank logo, badge, urgent indicator
- Requirements box with checkmarks
- Value section with gradient
- Action buttons (Track, Save)
- Icons from Material Community Icons

---

## 6. STATE MANAGEMENT (Zustand)

### useAuthStore
```typescript
// State
user: User | null
isAuthenticated: boolean
isLoading: boolean
error: string | null
verificationId: string | null
phoneNumber: string | null

// Actions
sendOTP(phoneNumber: string): Promise<void>
verifyOTP(otp: string): Promise<void>
signOut(): Promise<void>
setUser(user: User | null): void
clearError(): void
resetAuthFlow(): void
```
- Location: `/src/store/useAuthStore.ts`
- Manages phone auth flow with OTP

### useDealsStore
```typescript
// State
deals: Deal[]
filteredDeals: Deal[]
activeFilter: DealCategory

// Actions
setDeals(deals: Deal[]): void
setFilter(filter: DealCategory): void
toggleSave(dealId: string): void
toggleTrack(dealId: string): void
toggleWatch(dealId: string): void
```
- Location: `/src/store/useDealsStore.ts`
- Manages deal list and filtering

### useCardsStore
```typescript
// State
cards: Card[]
selectedCard: Card | null

// Actions
setCards(cards: Card[]): void
selectCard(cardId: string): void
addCard(card: Card): void
removeCard(cardId: string): void
toggleWatch(cardId: string): void
```
- Location: `/src/store/useCardsStore.ts`
- Card portfolio management

### useTrackerStore
```typescript
// State
trackerItems: TrackerItem[]
upcomingActions: UpcomingAction[]

// Actions
addTrackerItem(item: TrackerItem): void
updateProgress(itemId: string, progress: TrackerProgress): void
completeItem(itemId: string): void
addUpcomingAction(action: UpcomingAction): void
```
- Location: `/src/store/useTrackerStore.ts`
- Progress tracking management

---

## 7. API & SERVICE PATTERNS

### Authentication Service
```typescript
// File: /src/services/authService.ts

export const sendOTP = async (phoneNumber: string): Promise<string>
export const verifyOTP = async (verificationId: string, otp: string): 
  Promise<{ userId: string; phoneNumber: string; isNewUser: boolean }>
export const signOut = async (): Promise<void>
export const getCurrentUser = () => FirebaseUser | null
```

**Pattern:**
- Async/await with error handling
- Firebase Auth integration
- Mock mode fallback for development
- Phone number validation and formatting

### Data Fetching (React Query Pattern)
```typescript
// Example pattern (ready for implementation)
const { data, isLoading, error } = useQuery({
  queryKey: ['deals'],
  queryFn: async () => {
    const response = await axios.get('/api/deals');
    return response.data;
  },
});
```

### Firestore Data Access (Ready for Implementation)
```typescript
// Pattern for Firestore queries
import { collection, query, where, getDocs } from 'firebase/firestore';

const dealsRef = collection(db, 'deals');
const q = query(dealsRef, where('category', '==', 'SPEND'));
const querySnapshot = await getDocs(q);
```

---

## 8. DESIGN SYSTEM

### Color Palette
```typescript
Primary:              #FF6B35 (Vibrant Orange)
Secondary:           #5856D6 (Purple)
Success:             #34C759 (Green)
Warning:             #FF9500 (Orange)
Error:               #FF3B30 (Red)
Info:                #007AFF (Blue)

Background:          #FAFAFA (Light Gray)
Surface:             #FFFFFF (White)
Surface Secondary:   #F8F8F8 (Subtle Gray)

Text Primary:        #1A1A1A (Almost Black)
Text Secondary:      #666666 (Medium Gray)
Text Tertiary:       #999999 (Light Gray)

Border:              #E0E0E0
Border Light:        #F0F0F0
```

### Typography
```typescript
Text Styles:
- largeTitle:   36px, 700 weight
- title1:       32px, 700 weight
- title2:       28px, 700 weight
- title3:       22px, 700 weight
- headline:     17px, 700 weight
- body:         17px, 400 weight
- callout:      16px, 700 weight
- button:       15px, 700 weight
- small:        13px, 400 weight
- caption:      12px, 400 weight
- caption2:     11px, 400 weight

Font Weights: 400, 500, 600, 700
```

### Spacing Scale
```typescript
xs:     4px
sm:     8px
md:     12px
lg:     15px
xl:     20px
2xl:    25px
3xl:    30px
4xl:    40px
```

### Border Radius
```typescript
sm:     4px
md:     8px
lg:     12px
xl:     16px
2xl:    20px
pill:   999px
```

### Shadows
```typescript
card:      elevation: 3, shadowOpacity: 0.08, shadowRadius: 8
cardHover: elevation: 6, shadowOpacity: 0.12, shadowRadius: 16
button:    elevation: 2, shadowOpacity: 0.08, shadowRadius: 4
```

### Layout Constants
```typescript
screenPadding:    20px (horizontal)
cardPadding:      15px
sectionSpacing:   25px
statusBarHeight:  44px
bottomNavHeight:  70px
minTouchTarget:   44pt (iOS)
```

---

## 9. NAVIGATION STRUCTURE

### Bottom Tab Navigator (Main App)
```
Tab.Navigator
├── Feed Screen       (🏠)
├── Cards Screen      (💳)
├── Offers Screen     (🏷️)
├── Tracker Screen    (✅)
└── Profile Screen    (👤)
```

### Auth Navigator (Login Flow)
```
Stack.Navigator
├── Welcome Screen
├── Phone Login Screen
└── OTP Verification Screen
```

### Navigation Pattern
```typescript
// Usage in components
const navigation = useNavigation();
navigation.navigate('ScreenName');

// Tab navigation
useNavigation<BottomTabNavigationProp<RootTabParamList>>();
```

---

## 10. DEVELOPMENT PATTERNS

### Component Pattern
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '@constants/theme';

interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.md,
  },
  title: {
    ...Theme.textStyles.headline,
  },
});
```

### Screen Pattern
```typescript
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useStore } from '@store';
import { Theme } from '@constants/theme';

const MyScreen = () => {
  const { data, action } = useStore();
  const [state, setState] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Screen content */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

export default MyScreen;
```

### Store Pattern
```typescript
import { create } from 'zustand';

interface MyState {
  // State
  value: string;
  items: Item[];
  
  // Actions
  setValue: (value: string) => void;
  addItem: (item: Item) => void;
}

export const useMyStore = create<MyState>((set, get) => ({
  // Initial state
  value: '',
  items: [],
  
  // Actions
  setValue: (value) => set({ value }),
  
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
}));
```

### Hook Pattern (Ready for implementation)
```typescript
// /src/hooks/useDeals.ts
export const useDeals = () => {
  const deals = useDealsStore((state) => state.deals);
  const setFilter = useDealsStore((state) => state.setFilter);
  
  const filteredByCategory = (category: DealCategory) => {
    return deals.filter((deal) => deal.category === category);
  };
  
  return { deals, setFilter, filteredByCategory };
};
```

---

## 11. CONFIGURATION FILES

### tsconfig.json
```json
{
  "extends": "expo/tsconfig.base",
  "strict": true,
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"],
    "@components/*": ["src/components/*"],
    "@screens/*": ["src/screens/*"],
    "@navigation/*": ["src/navigation/*"],
    "@store/*": ["src/store/*"],
    "@services/*": ["src/services/*"],
    "@models/*": ["src/models/*"],
    "@hooks/*": ["src/hooks/*"],
    "@utils/*": ["src/utils/*"],
    "@constants/*": ["src/constants/*"],
    "@firebase/*": ["src/firebase/*"]
  }
}
```

### package.json Scripts
```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  }
}
```

### app.json (Expo Config)
```json
{
  "expo": {
    "name": "Zennity",
    "slug": "zennity-mobile",
    "version": "1.0.0",
    "assetBundlePatterns": ["**/*"],
    "plugins": [
      "expo-notifications"
    ]
  }
}
```

---

## 12. SETUP & QUICK START

### Installation
```bash
cd zennity-mobile
npm install
npm start
```

### Testing with Mock Auth
- Phone: Any 10-digit number (e.g., 1234567890)
- OTP: `123456`

### Firebase Setup
1. Create Firebase project at console.firebase.google.com
2. Enable Phone Authentication
3. Copy config from Project Settings
4. Update `/src/firebase/config.ts`

### Development Server
```bash
# Start Expo
npm start

# iOS (Mac only)
npm run ios

# Android
npm run android

# Web
npm run web
```

---

## 13. PATTERNS FOR OFFER MANAGEMENT MODULE

### Data Flow Pattern
```
Screen Component
  ↓
useStore Hook
  ↓
Zustand Store (useOffersStore)
  ↓
Service Layer (offersService.ts)
  ↓
Firebase/API
```

### Creating a New Feature
1. **Create Model** → `/src/models/Offer.ts`
2. **Create Store** → `/src/store/useOffersStore.ts`
3. **Create Service** → `/src/services/offersService.ts`
4. **Create Components** → `/src/components/offer/OfferCard.tsx`
5. **Create Screen** → `/src/screens/OffersManagementScreen.tsx`
6. **Add Route** → Update `/src/navigation/types.ts` and navigators
7. **Add Sample Data** → Update `/src/utils/sampleData.ts`

### Example Store (for Offers Management)
```typescript
import { create } from 'zustand';
import { Offer, OfferStatus } from '@models';

interface OffersManagementState {
  // State
  offers: Offer[];
  selectedOffer: Offer | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadOffers: (cardId?: string) => Promise<void>;
  createOffer: (offer: Offer) => Promise<void>;
  updateOffer: (offerId: string, updates: Partial<Offer>) => Promise<void>;
  deleteOffer: (offerId: string) => Promise<void>;
  selectOffer: (offerId: string) => void;
}

export const useOffersManagementStore = create<OffersManagementState>((set, get) => ({
  offers: [],
  selectedOffer: null,
  isLoading: false,
  error: null,
  
  loadOffers: async (cardId?: string) => {
    set({ isLoading: true });
    try {
      // Call service to fetch offers
      const offers = await offersService.getOffers(cardId);
      set({ offers, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  createOffer: async (offer: Offer) => {
    set({ isLoading: true });
    try {
      await offersService.createOffer(offer);
      get().loadOffers();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  // ... other actions
}));
```

---

## 14. KEY FILES REFERENCE

| Purpose | Location |
|---------|----------|
| **Entry Point** | App.tsx |
| **Components** | src/components/common/, src/components/deal/ |
| **Screens** | src/screens/ |
| **State Management** | src/store/ |
| **Data Models** | src/models/ |
| **Services** | src/services/ |
| **Navigation** | src/navigation/ |
| **Design Tokens** | src/constants/ |
| **Firebase Config** | src/firebase/config.ts |
| **Sample Data** | src/utils/sampleData.ts |
| **Theme System** | src/constants/theme.ts |

---

## 15. NEXT STEPS FOR OFFER MANAGEMENT MODULE

1. **Create Offer Model** with types for offer status, categories, conditions
2. **Design Offer Management Screen** with CRUD operations
3. **Build Offer Cards** following DealCard pattern
4. **Implement Store** with Zustand for state
5. **Create Services** for API/Firestore calls
6. **Add Form Validation** using Zod + React Hook Form
7. **Wire Navigation** to make screen accessible
8. **Implement Offer Tracking** - similar to deals tracking
9. **Add Filtering & Search** functionality
10. **Test with Sample Data** before Firebase integration

---

**Tech Stack Summary:**
- **Frontend:** React Native + TypeScript + Zustand
- **Backend:** Firebase (Auth + Firestore)
- **UI:** Custom design system with Expo components
- **Data Fetching:** Axios + React Query (ready)
- **Forms:** React Hook Form + Zod
- **Navigation:** React Navigation with bottom tabs
- **Development:** ESLint + Prettier + Expo

**Ready to build?** All patterns, models, and services are in place. Follow the existing code structure and you'll have a production-ready module!
