/**
 * Firebase Configuration
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project or use existing
 * 3. Enable Phone Authentication:
 *    - Go to Authentication → Sign-in method
 *    - Enable Phone provider
 * 4. Get your config from Project Settings → General → Your apps
 * 5. Copy the firebaseConfig object and replace below
 * 6. For testing, add test phone numbers in Firebase Console
 */

import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Replace with your Firebase config
// Get this from Firebase Console → Project Settings → General
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);

  // Initialize Auth with AsyncStorage persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

  // Initialize Firestore
  db = getFirestore(app);
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Fallback for development without Firebase
  auth = null as any;
  db = null as any;
}

export { app, auth, db };

// Helper to check if Firebase is configured
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== 'YOUR_API_KEY';
};

// Mock auth for development (when Firebase not configured)
export const useMockAuth = !isFirebaseConfigured();

if (useMockAuth) {
  console.warn(
    '⚠️ Firebase not configured. Using mock authentication.\n' +
    'See src/firebase/config.ts for setup instructions.'
  );
}
