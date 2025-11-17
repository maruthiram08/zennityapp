/**
 * Authentication Service
 * Handles phone authentication with Firebase (or mock for development)
 */

import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  signOut as firebaseSignOut,
  ConfirmationResult,
  RecaptchaVerifier,
} from 'firebase/auth';
import { auth, useMockAuth } from '@firebase/config';

// Mock verification for development
let mockVerificationId: string | null = null;
let mockPhoneNumber: string | null = null;

/**
 * Send OTP to phone number
 */
export const sendOTP = async (phoneNumber: string): Promise<string> => {
  // Format phone number (ensure +91 prefix for India)
  const formattedPhone = phoneNumber.startsWith('+')
    ? phoneNumber
    : `+91${phoneNumber}`;

  if (useMockAuth) {
    // Mock implementation for development
    console.log(`📱 Mock OTP sent to ${formattedPhone}: 123456`);
    mockVerificationId = `mock_${Date.now()}`;
    mockPhoneNumber = formattedPhone;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return mockVerificationId;
  }

  // Real Firebase implementation
  try {
    // Note: For web, you need reCAPTCHA
    // For React Native, this works differently
    // You might need to use firebase.auth().verifyPhoneNumber() with react-native-firebase

    const confirmation = await signInWithPhoneNumber(auth, formattedPhone, null as any);
    return confirmation.verificationId;
  } catch (error: any) {
    console.error('Send OTP error:', error);
    throw new Error(error.message || 'Failed to send OTP');
  }
};

/**
 * Verify OTP and sign in
 */
export const verifyOTP = async (
  verificationId: string,
  otp: string
): Promise<{ userId: string; phoneNumber: string; isNewUser: boolean }> => {
  if (useMockAuth) {
    // Mock implementation
    console.log(`🔐 Mock OTP verification: ${otp}`);

    // Check if OTP is correct (123456 for testing)
    if (otp !== '123456') {
      throw new Error('Invalid OTP. Use 123456 for testing.');
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists in AsyncStorage (for mock)
    const isNewUser = true; // Simplified for mock

    return {
      userId: `mock_user_${Date.now()}`,
      phoneNumber: mockPhoneNumber || '+911234567890',
      isNewUser,
    };
  }

  // Real Firebase implementation
  try {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    const userCredential = await signInWithCredential(auth, credential);

    return {
      userId: userCredential.user.uid,
      phoneNumber: userCredential.user.phoneNumber || '',
      isNewUser: userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime,
    };
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    throw new Error(error.message || 'Invalid OTP');
  }
};

/**
 * Sign out current user
 */
export const signOut = async (): Promise<void> => {
  if (useMockAuth) {
    console.log('👋 Mock sign out');
    mockVerificationId = null;
    mockPhoneNumber = null;
    return;
  }

  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw new Error(error.message || 'Failed to sign out');
  }
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
  if (useMockAuth) {
    return null;
  }
  return auth.currentUser;
};
