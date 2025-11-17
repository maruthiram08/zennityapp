import { create } from 'zustand';
import { User } from '@models/User';
import * as authService from '../services/authService';

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Phone auth flow
  verificationId: string | null;
  phoneNumber: string | null;

  // Actions
  sendOTP: (phoneNumber: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
  resetAuthFlow: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  verificationId: null,
  phoneNumber: null,

  // Send OTP to phone number
  sendOTP: async (phoneNumber: string) => {
    set({ isLoading: true, error: null, phoneNumber });

    try {
      const verificationId = await authService.sendOTP(phoneNumber);
      set({ verificationId, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Failed to send OTP',
      });
      throw error;
    }
  },

  // Verify OTP and complete authentication
  verifyOTP: async (otp: string) => {
    const { verificationId, phoneNumber } = get();

    if (!verificationId) {
      set({ error: 'No verification ID found' });
      throw new Error('No verification ID found');
    }

    set({ isLoading: true, error: null });

    try {
      const result = await authService.verifyOTP(verificationId, otp);

      // Create user object
      const user: User = {
        id: result.userId,
        phone: result.phoneNumber,
        authProvider: 'phone' as any,
        phoneVerified: true,
        preferences: {
          pushNotificationsEnabled: true,
          emailNotificationsEnabled: false,
          dealAlerts: true,
          trackerReminders: true,
          weeklyDigest: false,
          currency: 'INR',
          dateFormat: 'DD/MM/YYYY',
          analyticsEnabled: true,
          shareUsageData: true,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        verificationId: null,
        phoneNumber: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Invalid OTP',
      });
      throw error;
    }
  },

  // Sign out user
  signOut: async () => {
    set({ isLoading: true, error: null });

    try {
      await authService.signOut();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        verificationId: null,
        phoneNumber: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Failed to sign out',
      });
      throw error;
    }
  },

  // Set user (for manual updates)
  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset auth flow (go back to phone input)
  resetAuthFlow: () => {
    set({
      verificationId: null,
      phoneNumber: null,
      error: null,
    });
  },
}));
