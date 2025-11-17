# Firebase Setup Guide for Zennity

Complete guide to set up Firebase Phone Authentication for the Zennity mobile app.

## 🚀 Quick Start (Development Mode)

The app works **out of the box** in development mode with **mock authentication**!

```bash
npm start
# Use OTP: 123456 to log in
```

---

## 📱 Production Setup (Real Firebase)

Follow these steps to set up real Firebase Phone Authentication:

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `zennity` (or your choice)
4. Disable Google Analytics (optional for now)
5. Click **"Create project"**

### Step 2: Add Firebase to Your App

#### For iOS:
1. In Firebase Console, click the **iOS icon**
2. Enter your iOS bundle ID (from `app.json`: `com.yourcompany.zennity`)
3. Download `GoogleService-Info.plist`
4. Place it in your project root
5. Run: `npx expo prebuild`

#### For Android:
1. In Firebase Console, click the **Android icon**
2. Enter Android package name (from `app.json`: `com.yourcompany.zennity`)
3. Download `google-services.json`
4. Place it in your project root
5. Run: `npx expo prebuild`

#### For Web (Development):
1. In Firebase Console → Project Settings → General
2. Scroll to **"Your apps"**
3. Click **"Web"** icon (</>)
4. Register app with nickname: `zennity-web`
5. Copy the `firebaseConfig` object

### Step 3: Enable Phone Authentication

1. Go to **Authentication** → **Sign-in method**
2. Click **"Phone"**
3. Click **"Enable"**
4. Save

### Step 4: Configure Your App

Edit `src/firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "zennity-xxxxx.firebaseapp.com",
  projectId: "zennity-xxxxx",
  storageBucket: "zennity-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef",
};
```

### Step 5: Set Up Test Phone Numbers (Optional)

For testing without SMS costs:

1. Go to **Authentication** → **Sign-in method** → **Phone**
2. Scroll to **"Phone numbers for testing"**
3. Add test numbers:
   - Phone: `+91 1234567890`
   - OTP: `123456`
4. Save

Now you can test with these numbers without sending real SMS!

---

## 🔒 Security Rules (Firestore)

If you're using Firestore, set up security rules:

1. Go to **Firestore Database** → **Rules**
2. Add these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Deals, cards, etc. - read only for authenticated users
    match /deals/{dealId} {
      allow read: if request.auth != null;
    }

    match /cards/{cardId} {
      allow read: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

---

## 🎯 How Phone Authentication Works

### Flow:
```
1. User enters phone number
   ↓
2. Firebase sends OTP via SMS
   ↓
3. User enters 6-digit OTP
   ↓
4. Firebase verifies OTP
   ↓
5. User is signed in ✅
```

### Mock Authentication (Development):
- **Phone:** Any 10-digit number
- **OTP:** Always `123456`
- No Firebase needed!
- Perfect for UI testing

---

## 📋 Required Firebase Services

### 1. Authentication
- **Provider:** Phone
- **Cost:** Free for first 10K verifications/month
- **Setup:** Enable in Authentication → Sign-in method

### 2. Firestore (Optional, for data storage)
- **Cost:** Free tier: 50K reads, 20K writes/day
- **Setup:** Create database in Firestore section

### 3. Storage (Optional, for images)
- **Cost:** Free tier: 5GB storage, 1GB/day downloads
- **Setup:** Enable in Storage section

---

## 🔧 Environment Variables (Optional)

For better security, use environment variables:

1. Install expo-constants:
```bash
npm install expo-constants
```

2. Create `app.config.js`:
```javascript
export default {
  expo: {
    // ... other config
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      // ... other keys
    },
  },
};
```

3. Update `src/firebase/config.ts`:
```typescript
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  // ... etc
};
```

---

## 🧪 Testing

### Test the Authentication Flow:

```bash
# Start the app
npm start

# Open on your phone via Expo Go
# Scan QR code

# Test flow:
1. Welcome screen → Tap "Get Started"
2. Enter phone: 1234567890
3. Tap "Send OTP"
4. Enter OTP: 123456
5. Tap "Verify & Continue"
6. ✅ You're in!

# Test sign out:
1. Go to Profile tab
2. Tap "Sign Out"
3. Confirm
4. ✅ Back to Welcome screen
```

---

## 📱 SMS Provider Setup (Optional)

Firebase uses these SMS providers by default:
- **Twilio** (US, International)
- **Vonage** (formerly Nexmo)

### Costs:
- India: ~₹0.50 per SMS
- International: Varies by country

### Free Tier:
- First 10,000 verifications/month are FREE
- Perfect for testing and small apps!

---

## 🐛 Troubleshooting

### "Access denied" error
- Check if Firebase is configured (not using mock auth)
- Verify API key is correct
- Make sure Phone provider is enabled

### SMS not received
- Check phone number format: `+91 XXX XXX XXXX`
- Verify Phone Authentication is enabled
- Try test phone numbers first
- Check Firebase quota limits

### "Invalid OTP" error
- OTP expires after 5 minutes
- In mock mode, always use `123456`
- In production, use SMS OTP

### "reCAPTCHA verification failed"
- For web: Add your domain to Firebase Authorized Domains
- For mobile: This shouldn't happen (reCAPTCHA not needed)

---

## 💰 Cost Estimation

### Free Tier (Sufficient for Testing):
- **Phone Auth:** 10K verifications/month FREE
- **Firestore:** 50K reads, 20K writes/day FREE
- **Storage:** 5GB storage, 1GB/day transfer FREE

### Paid Tier (After Free Tier):
- **Phone Auth:** $0.01 - $0.06 per verification
- **Firestore:** $0.06/100K reads, $0.18/100K writes
- **Storage:** $0.026/GB/month

**For a small app with 1000 users:**
- Cost: ~₹500-1000/month (~$6-12/month)

---

## 🎉 You're All Set!

Your app now has:
- ✅ Phone Authentication (SMS OTP)
- ✅ Mock auth for development
- ✅ Secure Firebase connection
- ✅ User session management
- ✅ Sign out functionality

**Next Steps:**
1. Test authentication flow
2. Add user profile completion
3. Sync deals/cards with Firestore
4. Add push notifications
5. Deploy to production!

---

## 📚 Resources

- [Firebase Phone Auth Docs](https://firebase.google.com/docs/auth/web/phone-auth)
- [Expo Firebase Guide](https://docs.expo.dev/guides/using-firebase/)
- [Firebase Pricing](https://firebase.google.com/pricing)
- [React Native Firebase](https://rnfirebase.io/)

---

**Questions? Check the troubleshooting section or Firebase documentation!** 🚀
