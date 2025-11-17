# Zennity Mobile - Production React Native App

**Tagline:** "Never Miss a Deal"

A production-ready credit card deals tracking application built with React Native and Expo, targeting credit card enthusiasts in India.

## 🚀 Tech Stack

### Frontend
- **Framework:** React Native with Expo SDK
- **Language:** TypeScript (strict mode)
- **Navigation:** React Navigation v6 (Bottom Tabs + Stack)
- **State Management:** Zustand
- **UI:** Custom components based on design system
- **Icons:** @expo/vector-icons

### Backend (Ready for Integration)
- **Firebase Auth:** Email/Phone authentication
- **Firestore:** Cloud database
- **Storage:** AsyncStorage + MMKV for local caching

### Development Tools
- **Linting:** ESLint + TypeScript ESLint
- **Formatting:** Prettier
- **Testing:** Jest + React Native Testing Library (setup ready)

## 📱 Features

### Implemented
✅ Complete design system (colors, typography, spacing)
✅ TypeScript models for all entities (Deal, Card, Tracker, User, Calculator)
✅ Reusable UI components (Button, Badge, Card, ProgressBar, FilterChip)
✅ State management with Zustand stores
✅ Sample data for development
✅ Navigation types and structure

### Screens (Ready to Implement)
1. **Feed Screen** - Browse credit card deals with filters
2. **Cards Portfolio** - Manage your credit cards
3. **Offers Browser** - Explore offers by category
4. **Tracker** - Track progress on active deals
5. **Stacking Calculator** - Calculate max returns
6. **Profile/Settings** - User preferences

## 🎨 Design System

### Brand Colors
```typescript
Primary Orange:   #FF6B35  // CTAs, primary actions
Secondary Purple: #5856D6  // Transfer bonuses, premium
Success Green:    #34C759  // Completed, positive status
Warning Orange:   #FF9500  // Expiring soon
Alert Red:        #FF3B30  // Urgent alerts
```

### Typography
- **Font:** SF Pro (iOS system font)
- **Sizes:** 11px - 36px with predefined text styles
- **Weights:** Regular (400) to Bold (700)

### Layout
- **Spacing System:** 4px, 8px, 12px, 15px, 20px, 25px, 30px, 40px
- **Border Radius:** 4px, 8px, 12px, 16px, 20px, pill
- **Min Touch Target:** 44pt (iOS standard)

## 📁 Project Structure

```
zennity-mobile/
├── src/
│   ├── components/
│   │   └── common/          # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Card.tsx
│   │       ├── ProgressBar.tsx
│   │       └── FilterChip.tsx
│   ├── constants/           # Design tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── theme.ts
│   ├── models/              # TypeScript types/interfaces
│   │   ├── Deal.ts
│   │   ├── Card.ts
│   │   ├── Tracker.ts
│   │   ├── User.ts
│   │   └── Calculator.ts
│   ├── navigation/          # Navigation configuration
│   │   └── types.ts
│   ├── screens/             # Screen components (to be implemented)
│   ├── store/               # Zustand state management
│   │   ├── useDealsStore.ts
│   │   ├── useCardsStore.ts
│   │   └── useTrackerStore.ts
│   ├── services/            # API services (ready for Firebase)
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   │   └── sampleData.ts    # Mock data for development
│   └── firebase/            # Firebase configuration (to be setup)
├── assets/                  # Images, fonts
├── App.tsx                  # App entry point
├── package.json
├── tsconfig.json
├── .eslintrc.js
└── .prettierrc
```

## 🛠 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Navigate to project directory:**
```bash
cd zennity-mobile
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm start
```

4. **Run on platform:**
```bash
# iOS (Mac only)
npm run ios

# Android
npm run android

# Web (for development)
npm run web
```

## 📦 Dependencies

### Core
- `react-native` - Mobile framework
- `expo` - Development platform
- `typescript` - Type safety

### Navigation
- `@react-navigation/native`
- `@react-navigation/bottom-tabs`
- `@react-navigation/native-stack`
- `react-native-screens`
- `react-native-safe-area-context`

### State & Data
- `zustand` - State management
- `@react-native-async-storage/async-storage` - Local storage
- `react-native-mmkv` - Fast storage
- `axios` - HTTP client
- `@tanstack/react-query` - Data fetching

### Forms & Validation
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `@hookform/resolvers` - Form resolvers

### Backend
- `firebase` - Authentication & database
- `expo-notifications` - Push notifications

### Utilities
- `date-fns` - Date manipulation

### Development
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `eslint`
- `prettier`
- `eslint-config-prettier`

## 🔧 Configuration

### TypeScript
- Strict mode enabled
- Path aliases configured (`@components/*`, `@models/*`, etc.)
- Full type safety for React Native

### ESLint
- TypeScript rules enabled
- Prettier integration
- Expo config extended

### Prettier
- Single quotes
- Trailing commas (ES5)
- 100 character line width
- 2-space indentation

## 🎯 Data Models

### Deal
```typescript
interface Deal {
  id: string;
  title: string;
  subtitle: string;
  type: DealType; // HOT, TRANSFER, WELCOME, etc.
  category: DealCategory;
  value: string;
  requirements?: DealRequirement[];
  daysLeft?: number;
  // ... more fields
}
```

### Card
```typescript
interface Card {
  id: string;
  name: string;
  bankName: string;
  tier: CardTier;
  network: CardNetwork;
  annualFee: number;
  activeOffersCount: number;
  gradientColors?: string[];
  // ... more fields
}
```

### TrackerItem
```typescript
interface TrackerItem {
  id: string;
  title: string;
  goalType: GoalType;
  status: TrackerStatus;
  progress: TrackerProgress;
  daysRemaining?: number;
  // ... more fields
}
```

## 🎨 UI Components

### Button
```tsx
<Button
  title="Track This"
  onPress={handlePress}
  variant="primary" // primary, secondary, outline, ghost
  size="medium" // small, medium, large
  fullWidth
/>
```

### Badge
```tsx
<Badge
  text="🔥 Ends in 2 days"
  variant="hot" // hot, transfer, welcome, etc.
/>
```

### Card
```tsx
<Card
  compact
  leftBorderColor={Theme.colors.primary}
  onPress={handlePress}
>
  {children}
</Card>
```

### ProgressBar
```tsx
<ProgressBar
  progress={75} // 0-100
  color={Theme.colors.success}
/>
```

## 🔄 State Management

### Deals Store
```typescript
const { deals, setFilter, toggleSave } = useDealsStore();
```

### Cards Store
```typescript
const { cards, selectCard, selectedCard } = useCardsStore();
```

### Tracker Store
```typescript
const { trackerItems, updateProgress } = useTrackerStore();
```

## 🚧 Next Steps

### Phase 1: Complete MVP Screens
1. Implement Feed Screen with deal cards
2. Create Cards Portfolio screen
3. Build Tracker screen with progress bars
4. Develop Offers Browser
5. Implement Stacking Calculator
6. Add Profile/Settings screen

### Phase 2: Firebase Integration
1. Setup Firebase project
2. Implement authentication (Email/Phone)
3. Connect Firestore for data persistence
4. Add Cloud Functions for business logic
5. Setup push notifications

### Phase 3: Polish & Launch
1. Add animations and transitions
2. Implement error handling
3. Add loading states
4. Performance optimization
5. Testing (unit + integration)
6. Beta testing with TestFlight/Play Console
7. App Store submission

## 📱 Running on Physical Device

### Using Expo Go
1. Install Expo Go app on your phone
2. Scan QR code from terminal
3. App loads instantly

### Building Standalone App
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## 🤝 Contributing

This is a production app under active development. Code follows strict TypeScript and ESLint rules.

## 📄 License

Proprietary - Zennity App

---

## 🎯 Key Highlights

✅ **Production-Ready Architecture** - Scalable folder structure
✅ **Type-Safe** - Full TypeScript coverage
✅ **Modern Stack** - Latest React Native + Expo
✅ **State Management** - Zustand for simplicity
✅ **Design System** - Consistent UI tokens
✅ **Firebase Ready** - Easy backend integration
✅ **Well-Documented** - Clear code and comments

---

**Built with ❤️ for credit card enthusiasts in India**
