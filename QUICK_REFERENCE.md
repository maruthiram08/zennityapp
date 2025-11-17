# Zennity Mobile - Quick Reference Guide

## Tech Stack at a Glance

```
Frontend:
┌─────────────────────────────────────┐
│ React Native (v0.81.5)              │
│ Expo (v54.0.23) - Dev Platform      │
│ TypeScript (v5.9.2) - Strict Mode   │
│ React 19.1.0                        │
└─────────────────────────────────────┘

State Management:
┌─────────────────────────────────────┐
│ Zustand (v5.0.8)                    │
│ - useAuthStore                      │
│ - useDealsStore                     │
│ - useCardsStore                     │
│ - useTrackerStore                   │
└─────────────────────────────────────┘

Backend & Database:
┌─────────────────────────────────────┐
│ Firebase Auth (Phone OTP)           │
│ Firestore (Cloud DB)                │
│ AsyncStorage (Local Data)           │
│ MMKV (Fast Storage)                 │
└─────────────────────────────────────┘

Data & Forms:
┌─────────────────────────────────────┐
│ Axios (v1.13.2) - HTTP Client       │
│ React Query (v5.90.10) - Caching    │
│ React Hook Form (v7.66.0)           │
│ Zod (v3.25.76) - Validation         │
└─────────────────────────────────────┘

Navigation:
┌─────────────────────────────────────┐
│ React Navigation (v7.1.20)          │
│ Bottom Tabs + Stack Navigator       │
└─────────────────────────────────────┘

UI & Design:
┌─────────────────────────────────────┐
│ Custom Design System                │
│ Expo Linear Gradient                │
│ Expo Vector Icons                   │
│ Theme Tokens & Components           │
└─────────────────────────────────────┘
```

## Project Structure Quick View

```
src/
├── components/
│   ├── common/          ← Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── ProgressBar.tsx
│   │   └── FilterChip.tsx
│   └── deal/
│       └── DealCard.tsx  ← Complex deal component
│
├── screens/             ← Full screen components
│   ├── FeedScreen.tsx
│   ├── CardsScreen.tsx
│   ├── OffersScreen.tsx
│   ├── TrackerScreen.tsx
│   ├── ProfileScreen.tsx
│   └── auth/            ← Login screens
│
├── store/               ← Zustand state management
│   ├── useAuthStore.ts
│   ├── useDealsStore.ts
│   ├── useCardsStore.ts
│   └── useTrackerStore.ts
│
├── services/            ← API & Firebase logic
│   └── authService.ts
│
├── models/              ← TypeScript interfaces
│   ├── Deal.ts
│   ├── Card.ts
│   ├── User.ts
│   ├── Tracker.ts
│   └── Calculator.ts
│
├── constants/           ← Design tokens
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── theme.ts
│
├── navigation/          ← Navigation setup
│   ├── types.ts
│   ├── BottomTabNavigator.tsx
│   └── AuthNavigator.tsx
│
├── firebase/            ← Firebase config
│   └── config.ts
│
└── utils/               ← Utilities
    └── sampleData.ts    ← Mock data
```

## Key Patterns

### 1. Data Flow
```
User Action
    ↓
Component
    ↓
useStore Hook (Zustand)
    ↓
Store Action
    ↓
Service (API/Firebase)
    ↓
Update State
    ↓
Re-render Component
```

### 2. Component Template
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '@constants/theme';

interface Props {
  title: string;
  onPress?: () => void;
}

export const MyComponent: React.FC<Props> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: Theme.spacing.md },
  title: { ...Theme.textStyles.headline },
});
```

### 3. Store Template
```typescript
import { create } from 'zustand';

interface State {
  items: Item[];
  addItem: (item: Item) => void;
}

export const useMyStore = create<State>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item],
  })),
}));
```

### 4. Service Template
```typescript
import axios from 'axios';

export const getItems = async (): Promise<Item[]> => {
  try {
    const response = await axios.get('/api/items');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
};
```

## Color Tokens

```typescript
Primary:    #FF6B35  // Orange (CTAs)
Secondary:  #5856D6  // Purple (Premium)
Success:    #34C759  // Green (Completed)
Warning:    #FF9500  // Orange (Expiring)
Error:      #FF3B30  // Red (Urgent)
Info:       #007AFF  // Blue

Background:      #FAFAFA
Surface:         #FFFFFF
Text Primary:    #1A1A1A
Text Secondary:  #666666
Text Tertiary:   #999999
```

## Spacing Scale

```typescript
xs:   4px    md:   12px    2xl:  25px
sm:   8px    lg:   15px    3xl:  30px
      xl:   20px    4xl:  40px
```

## Component Variants

### Button
```typescript
variant: "primary" | "secondary" | "outline" | "ghost"
size: "small" | "medium" | "large"
state: default | disabled | loading
```

### Badge
```typescript
variant: "hot" | "transfer" | "welcome" | "stacking" | "bank" | "miles"
```

### Card
```typescript
compact: boolean (default: false)
leftBorderColor: string (optional)
onPress: () => void (optional)
```

## Common Tasks

### Add a New Deal
1. Go to `/src/store/useDealsStore.ts`
2. Update the `deals` state with new deal object
3. Deal automatically appears in FeedScreen

### Create a Store
```typescript
// 1. Create /src/store/useMyStore.ts
// 2. Define interface
// 3. Use create() from zustand
// 4. Export store
// 5. Import in components
```

### Add a Screen
```typescript
// 1. Create /src/screens/MyScreen.tsx
// 2. Add to navigation
// 3. Use useStore hooks
// 4. Build UI with components
```

### Style with Theme
```typescript
// Always use Theme tokens
backgroundColor: Theme.colors.primary
padding: Theme.spacing.md
...Theme.textStyles.headline
borderRadius: Theme.borderRadius.lg
...Theme.shadows.card
```

## Firebase Setup Checklist

- [ ] Create Firebase project
- [ ] Enable Phone Authentication
- [ ] Get Firebase config
- [ ] Update `/src/firebase/config.ts`
- [ ] Initialize Firestore
- [ ] Create security rules
- [ ] Add test phone numbers
- [ ] Test auth flow

## Default Credentials (Development)

```
Phone: Any 10-digit number
OTP: 123456
```

## File Locations Reference

| Feature | File |
|---------|------|
| Authentication | `/src/services/authService.ts` |
| Auth State | `/src/store/useAuthStore.ts` |
| Deals | `/src/store/useDealsStore.ts` |
| Cards | `/src/store/useCardsStore.ts` |
| Tracker | `/src/store/useTrackerStore.ts` |
| Design System | `/src/constants/theme.ts` |
| Sample Data | `/src/utils/sampleData.ts` |
| Navigation Types | `/src/navigation/types.ts` |

## Helpful Commands

```bash
# Start app
npm start

# iOS
npm run ios

# Android
npm run android

# Web
npm run web

# Lint code
npx eslint .

# Format code
npx prettier --write .
```

## Import Aliases

```typescript
@/          // src/
@components // src/components/
@screens    // src/screens/
@store      // src/store/
@services   // src/services/
@models     // src/models/
@constants  // src/constants/
@navigation // src/navigation/
@hooks      // src/hooks/
@utils      // src/utils/
@firebase   // src/firebase/
```

## Data Model Cheat Sheet

### Deal
- Types: HOT, TRANSFER, WELCOME, STACKING, BANK_BONUS, MILES_SALE
- Categories: ALL, SPEND, TRANSFER, WELCOME
- Complexity: EASY, MODERATE, COMPLEX
- Actions: track, save, watch

### Card
- Tiers: BASIC, SILVER, GOLD, PLATINUM, PREMIUM
- Networks: VISA, MASTERCARD, RUPAY, AMEX, DINERS

### Tracker
- Goals: SPENDING, TRANSACTION_COUNT, MILESTONE, APPLICATION, FEE_DUE, POINTS_EXPIRY, CUSTOM
- Status: NOT_STARTED, IN_PROGRESS, COMPLETED, FAILED, EXPIRED

### User
- Auth Providers: EMAIL, PHONE, GOOGLE, APPLE

## Development Tips

1. **Use Theme everywhere** - Never hardcode colors/spacing
2. **Follow the store pattern** - State lives in Zustand stores
3. **Compose components** - Build from small, reusable pieces
4. **Type everything** - TypeScript strict mode enabled
5. **Use sample data** - Test with mock data before Firebase
6. **Keep services thin** - Move logic to stores
7. **Test on device** - Use Expo Go for mobile testing
8. **Check console** - Firebase provides helpful error messages

## Next Build: Offer Management Module

1. Create `Offer.ts` model in `/src/models/`
2. Create `useOffersStore.ts` in `/src/store/`
3. Create `offersService.ts` in `/src/services/`
4. Create `OfferCard.tsx` in `/src/components/`
5. Create offer management screen
6. Wire up navigation
7. Add to sample data
8. Test locally
9. Connect to Firebase

---

All patterns, components, and infrastructure are ready. Start building!
