import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Button } from '@components/common/Button';
import { Theme } from '@constants/theme';
import { useAuthStore } from '@store';

interface PhoneLoginScreenProps {
  onOTPSent: () => void;
  onBack: () => void;
}

const PhoneLoginScreen: React.FC<PhoneLoginScreenProps> = ({ onOTPSent, onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { sendOTP, isLoading, error, clearError } = useAuthStore();

  const handleSendOTP = async () => {
    // Clear previous errors
    clearError();

    // Validate phone number
    const cleanPhone = phoneNumber.replace(/\s/g, '');
    if (cleanPhone.length !== 10) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number');
      return;
    }

    try {
      await sendOTP(cleanPhone);
      onOTPSent();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send OTP');
    }
  };

  const formatPhoneNumber = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');

    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);

    // Format as XXX XXX XXXX
    if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 6) {
      return `${limited.slice(0, 3)} ${limited.slice(3)}`;
    } else {
      return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`;
    }
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Enter your mobile number</Text>
            <Text style={styles.subtitle}>
              We'll send you an OTP to verify your number
            </Text>
          </View>

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <View style={styles.phoneInputWrapper}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="XXX XXX XXXX"
                placeholderTextColor={Theme.colors.textTertiary}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
                maxLength={12} // 10 digits + 2 spaces
                autoFocus
              />
            </View>
          </View>

          {/* Error Message */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Info */}
          <Text style={styles.infoText}>
            By continuing, you agree to receive an SMS for verification.
            Standard rates may apply.
          </Text>
        </View>

        {/* Bottom Button */}
        <View style={styles.bottom}>
          <Button
            title={isLoading ? 'Sending OTP...' : 'Send OTP'}
            onPress={handleSendOTP}
            variant="primary"
            fullWidth
            disabled={phoneNumber.replace(/\s/g, '').length !== 10 || isLoading}
            loading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Theme.layout.screenPadding,
    paddingTop: Theme.spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 28,
    color: Theme.colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Theme.layout.screenPadding,
    paddingTop: Theme.spacing['3xl'],
  },
  titleContainer: {
    marginBottom: Theme.spacing['3xl'],
  },
  title: {
    fontSize: Theme.fontSizes['4xl'],
    fontWeight: '700',
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.textSecondary,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: Theme.spacing.lg,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.lg,
    backgroundColor: Theme.colors.surface,
    paddingHorizontal: Theme.spacing.lg,
    height: 60,
  },
  countryCode: {
    paddingRight: Theme.spacing.md,
    borderRightWidth: 1,
    borderRightColor: Theme.colors.borderLight,
  },
  countryCodeText: {
    fontSize: Theme.fontSizes.xl,
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    fontSize: Theme.fontSizes.xl,
    fontWeight: '600',
    paddingLeft: Theme.spacing.lg,
    color: Theme.colors.textPrimary,
  },
  errorContainer: {
    backgroundColor: Theme.colors.error + '15',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.lg,
  },
  errorText: {
    color: Theme.colors.error,
    fontSize: Theme.fontSizes.sm,
  },
  infoText: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.textSecondary,
    lineHeight: 18,
  },
  bottom: {
    paddingHorizontal: Theme.layout.screenPadding,
    paddingBottom: Theme.spacing.xl,
  },
});

export default PhoneLoginScreen;
