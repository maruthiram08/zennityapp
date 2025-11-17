# Zennity Mobile - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- Git
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd zennityapp/zennity-mobile
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run on your device**
- Scan the QR code with:
  - **iOS:** Camera app
  - **Android:** Expo Go app
- The app will load on your phone!

## 📱 Running on Simulators/Emulators

### iOS Simulator (Mac only)
```bash
npm run ios
```

**Requirements:**
- macOS
- Xcode installed
- iOS Simulator setup

### Android Emulator
```bash
npm run android
```

**Requirements:**
- Android Studio installed
- Android emulator configured
- ANDROID_HOME environment variable set

### Web (for testing)
```bash
npm run web
```

Opens in your browser at `http://localhost:19006`

## 🏗 Project Structure

```
zennity-mobile/
├── App.tsx                      # App entry point with navigation
├── src/
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── FilterChip.tsx
│   │   └── deal/
│   │       └── DealCard.tsx    # Deal card component
│   ├── constants/              # Design system tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── theme.ts
│   ├── models/                 # TypeScript interfaces
│   │   ├── Deal.ts
│   │   ├── Card.ts
│   │   ├── Tracker.ts
│   │   ├── User.ts
│   │   └── Calculator.ts
│   ├── navigation/             # Navigation setup
│   │   ├── types.ts
│   │   └── BottomTabNavigator.tsx
│   ├── screens/                # App screens
│   │   ├── FeedScreen.tsx      # Home feed with deals
│   │   ├── CardsScreen.tsx     # Card portfolio
│   │   ├── OffersScreen.tsx    # Offers browser
│   │   ├── TrackerScreen.tsx   # Progress tracker
│   │   └── ProfileScreen.tsx   # User profile
│   ├── store/                  # Zustand state management
│   │   ├── useDealsStore.ts
│   │   ├── useCardsStore.ts
│   │   └── useTrackerStore.ts
│   └── utils/
│       └── sampleData.ts       # Mock data for testing
├── assets/                     # Images, fonts
├── package.json
├── tsconfig.json
└── app.json
```

## 🎨 Design System

### Colors
All colors are defined in `src/constants/colors.ts`:
- **Primary Orange:** `#FF6B35` - CTAs, primary actions
- **Secondary Purple:** `#5856D6` - Transfer bonuses
- **Success Green:** `#34C759` - Completed tasks
- **Warning Orange:** `#FF9500` - Expiring soon
- **Alert Red:** `#FF3B30` - Urgent alerts

### Typography
Typography system in `src/constants/typography.ts`:
- **Font Family:** SF Pro (iOS system font)
- **Sizes:** 11px - 36px
- **Weights:** Regular (400) - Bold (700)

### Spacing
Consistent spacing in `src/constants/spacing.ts`:
- XS: 4px, SM: 8px, MD: 12px, LG: 15px, XL: 20px

## 📦 State Management

### Zustand Stores

**Deals Store** (`useDealsStore`)
```typescript
const { deals, filteredDeals, setFilter, toggleTrack } = useDealsStore();
```

**Cards Store** (`useCardsStore`)
```typescript
const { cards, selectedCard, selectCard } = useCardsStore();
```

**Tracker Store** (`useTrackerStore`)
```typescript
const { trackerItems, upcomingActions, updateProgress } = useTrackerStore();
```

## 🧩 Using Components

### Button
```tsx
<Button
  title="Track This"
  onPress={handlePress}
  variant="primary"  // primary, secondary, outline, ghost
  size="medium"      // small, medium, large
  fullWidth
/>
```

### Badge
```tsx
<Badge
  text="🔥 Ends in 2 days"
  variant="hot"  // hot, transfer, welcome, stacking, bank, miles
/>
```

### Card
```tsx
<Card
  compact
  leftBorderColor={Theme.colors.primary}
  leftBorderWidth={4}
>
  {children}
</Card>
```

### ProgressBar
```tsx
<ProgressBar
  progress={75}  // 0-100
  color={Theme.colors.success}
  height={8}
/>
```

## 🛠 Development Commands

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web

# Type check
npm run tsc

# Lint code
npm run lint

# Format code
npm run format
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Watch Mode
```bash
npm test -- --watch
```

## 📱 Building for Production

### Using EAS Build (Recommended)

1. **Install EAS CLI**
```bash
npm install -g eas-cli
```

2. **Login to Expo**
```bash
eas login
```

3. **Configure EAS**
```bash
eas build:configure
```

4. **Build for iOS**
```bash
eas build --platform ios
```

5. **Build for Android**
```bash
eas build --platform android
```

6. **Build for both**
```bash
eas build --platform all
```

### App Store Submission

**iOS (TestFlight & App Store)**
1. Build with EAS: `eas build --platform ios`
2. Download the .ipa file
3. Upload to App Store Connect
4. Submit for review

**Android (Play Console)**
1. Build with EAS: `eas build --platform android`
2. Download the .aab file
3. Upload to Google Play Console
4. Submit for review

## 🔧 Configuration

### App Configuration (`app.json`)
```json
{
  "expo": {
    "name": "Zennity",
    "slug": "zennity-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FF6B35"
    }
  }
}
```

### Environment Variables
Create a `.env` file:
```env
API_URL=https://api.zennity.com
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
```

## 🚀 Deployment

### Over-the-Air (OTA) Updates
```bash
# Publish update
eas update --branch production --message "Bug fixes"
```

### Internal Distribution
```bash
# Build for internal testing
eas build --profile preview --platform all
```

## 📊 Performance Optimization

### Tips
1. **Use React.memo** for expensive components
2. **Lazy load** screens with React.lazy
3. **Optimize images** - use WebP format
4. **Enable Hermes** for Android (already enabled)
5. **Use FlashList** for long lists (instead of FlatList)

### Bundle Size
Check bundle size:
```bash
npx expo-cli export --dump-sourcemap
npx source-map-explorer bundle.js
```

## 🐛 Debugging

### React DevTools
```bash
npx react-devtools
```

### Network Debugging
Use Flipper or React Native Debugger

### Logs
```bash
# iOS
xcrun simctl spawn booted log stream --predicate 'processImagePath endswith "Expo"'

# Android
adb logcat | grep "ReactNativeJS"
```

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## ❓ Troubleshooting

### Common Issues

**1. Metro bundler cache issues**
```bash
npx expo start -c
```

**2. Node modules issues**
```bash
rm -rf node_modules
npm install
```

**3. iOS build fails**
```bash
cd ios
pod install
cd ..
```

**4. Android gradle issues**
```bash
cd android
./gradlew clean
cd ..
```

## 🤝 Support

For issues and questions:
- Check the documentation above
- Search existing GitHub issues
- Create a new issue with details

---

**Happy Coding! 🎉**
