# Troubleshooting Guide - Zennity Mobile App

## 🚨 Current Issue: "Access denied" JSON Parse Error

### Problem Description
When running `npm start` or `npx expo start`, you may encounter:
```
SyntaxError: Unexpected token 'A', "Access denied" is not valid JSON
```

### Root Cause
This error occurs because:
1. **Network/Proxy Restrictions**: The environment has HTTP proxy settings or network restrictions
2. **Expo Cloud API Blocked**: Expo CLI tries to fetch version data from `expo.io` cloud services before starting
3. **Dependency Validation**: The error happens during dependency version validation which requires internet access

### ✅ Solution 1: Run on Your Local PC (Recommended)

Since your PC has VS Code installed, run the app there for best results:

#### Step 1: Clone the Repository on Your PC
```bash
# Open terminal/command prompt on your PC
cd path/to/your/projects
git clone https://github.com/maruthiram08/zennityapp.git
cd zennityapp/zennity-mobile
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Start the Development Server
```bash
npm start
```

#### Step 4: View the App
You'll see a QR code in the terminal. You have 3 options:

**Option A: Mobile Device (via Expo Go)**
1. Install [Expo Go](https://expo.dev/client) on your iOS/Android phone
2. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app
3. The app will load on your phone

**Option B: Android Emulator**
1. Press `a` in the terminal
2. Requires Android Studio and an emulator to be set up

**Option C: iOS Simulator** (Mac only)
1. Press `i` in the terminal
2. Requires Xcode to be installed

**Option D: Web Browser**
1. Press `w` in the terminal
2. Opens in your default browser at `http://localhost:19006`

---

### ✅ Solution 2: Use Expo Go on Mobile (Easiest)

If you just want to see the app working quickly:

1. **On Your PC**: Start the server with `npm start`
2. **On Your Phone**:
   - Install **Expo Go** from App Store/Play Store
   - Scan the QR code shown in terminal
3. **Test the App**:
   - You'll see the Welcome screen
   - Tap "Get Started"
   - Enter any 10-digit phone number
   - Tap "Send OTP"
   - Enter OTP: `123456` (mock auth for testing)
   - You're in!

---

### ✅ Solution 3: Tunnel Mode (for Restrictive Networks)

If local network doesn't work, use tunnel mode:

```bash
# Install ngrok globally
npm install -g @expo/ngrok

# Start with tunnel
npx expo start --tunnel
```

This creates a public URL that bypasses local network restrictions.

---

### ✅ Solution 4: Offline Mode (Limited Features)

For development without internet:

```bash
EXPO_NO_DOCTOR=1 npx expo start --offline
```

**Note**: This mode has limitations and may not work for all features.

---

## 📱 Testing the Authentication Flow

Once the app is running, test the complete flow:

### 1. Welcome Screen
- See app logo and 3 key features
- Tap "Get Started"

### 2. Phone Login Screen
- Enter Indian phone number: `1234567890`
- Auto-formats to: `+91 123 456 7890`
- Tap "Send OTP"

### 3. OTP Verification Screen
- Enter test OTP: `123456` (shown on screen for dev mode)
- OTP auto-submits when all 6 digits entered
- Or tap "Verify & Continue"

### 4. Main App
- You're now in the app!
- See 5 tabs: Feed, Cards, Tracker, Offers, Profile
- Browse deals, cards, and offers
- Test Sign Out from Profile tab

---

## 🔧 Common Issues & Fixes

### Issue: Metro Bundler Won't Start
**Solution**: Kill existing processes and restart
```bash
# Kill all node processes
pkill -f node

# Or on Windows
taskkill /F /IM node.exe

# Restart
npm start
```

### Issue: Port 8081 Already in Use
**Solution**: Use a different port
```bash
npx expo start --port 8082
```

### Issue: QR Code Not Scanning
**Solutions**:
1. Make sure phone and PC are on same Wi-Fi network
2. Use tunnel mode: `npx expo start --tunnel`
3. Manually enter the URL shown in terminal into Expo Go app

### Issue: "Unable to resolve module"
**Solution**: Clear cache and reinstall
```bash
# Clear npm cache
npm cache clean --force

# Clear Metro bundler cache
npx expo start -c

# Or clear everything
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Firebase not configured" Error
**Solution**: This is expected in development mode
- The app uses **mock authentication** by default
- OTP is always `123456`
- See `FIREBASE_SETUP.md` for production Firebase setup

---

## 📂 Project Structure

```
zennity-mobile/
├── App.tsx                 # Main app entry point
├── src/
│   ├── screens/
│   │   └── auth/           # Authentication screens
│   │       ├── WelcomeScreen.tsx
│   │       ├── PhoneLoginScreen.tsx
│   │       └── OTPVerificationScreen.tsx
│   ├── navigation/
│   │   ├── AuthNavigator.tsx      # Auth flow navigation
│   │   └── BottomTabNavigator.tsx # Main app navigation
│   ├── store/              # Zustand state management
│   │   └── useAuthStore.ts
│   ├── services/
│   │   └── authService.ts  # Mock & Firebase auth
│   └── firebase/
│       └── config.ts       # Firebase configuration
├── FIREBASE_SETUP.md       # Firebase setup guide
├── TROUBLESHOOTING.md      # This file
└── package.json
```

---

## 🎯 Next Steps

1. **Get the App Running**: Follow Solution 1 (Run on Your Local PC)
2. **Test Authentication**: Use OTP `123456` to test the flow
3. **Explore the App**: Browse all 5 tabs and features
4. **Set Up Firebase** (Optional): Follow `FIREBASE_SETUP.md` for production
5. **Deploy to Production**: Build for iOS/Android when ready

---

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Phone Auth Docs](https://firebase.google.com/docs/auth/web/phone-auth)
- [Troubleshooting Expo](https://docs.expo.dev/troubleshooting/clear-cache-windows/)

---

## 💬 Need More Help?

If you're still stuck:
1. Check the Expo documentation: https://docs.expo.dev/
2. Search for your specific error on Stack Overflow
3. Check GitHub issues: https://github.com/expo/expo/issues
4. Join Expo Discord: https://chat.expo.dev/

---

**Remember**: The app works perfectly in development mode with mock authentication. You don't need Firebase to test and develop features!

Happy coding! 🚀
