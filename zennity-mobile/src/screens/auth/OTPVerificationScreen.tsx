import React, { useState, useRef, useEffect } from 'react';
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

interface OTPVerificationScreenProps {
  onVerified: () => void;
  onBack: () => void;
}

const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  onVerified,
  onBack,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const { verifyOTP, sendOTP, phoneNumber, isLoading, error, clearError } = useAuthStore();

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOTPChange = (value: string, index: number) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits entered
    if (newOtp.every(digit => digit !== '') && newOtp.length === 6) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (otpCode?: string) => {
    clearError();
    const code = otpCode || otp.join('');

    if (code.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a 6-digit OTP');
      return;
    }

    try {
      await verifyOTP(code);
      onVerified();
    } catch (error: any) {
      Alert.alert('Verification Failed', error.message || 'Invalid OTP');
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    if (!canResend || !phoneNumber) return;

    clearError();
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);

    try {
      await sendOTP(phoneNumber);
      Alert.alert('OTP Sent', 'A new OTP has been sent to your phone');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to resend OTP');
      setCanResend(true);
    }
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('91')) {
      return `+91 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    }
    return phone;
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
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              We've sent a 6-digit code to{'\n'}
              <Text style={styles.phoneText}>{formatPhoneNumber(phoneNumber || '')}</Text>
            </Text>
          </View>

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  digit !== '' && styles.otpInputFilled,
                  error && styles.otpInputError,
                ]}
                value={digit}
                onChangeText={value => handleOTPChange(value, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Error Message */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Development Note */}
          <View style={styles.devNote}>
            <Text style={styles.devNoteText}>
              💡 For testing, use OTP: <Text style={styles.devNoteCode}>123456</Text>
            </Text>
          </View>

          {/* Resend */}
          <View style={styles.resendContainer}>
            {canResend ? (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>Didn't receive OTP? Resend</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>
                Resend OTP in {timer}s
              </Text>
            )}
          </View>
        </View>

        {/* Bottom Button */}
        <View style={styles.bottom}>
          <Button
            title={isLoading ? 'Verifying...' : 'Verify & Continue'}
            onPress={() => handleVerify()}
            variant="primary"
            fullWidth
            disabled={otp.some(digit => digit === '') || isLoading}
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
  phoneText: {
    fontWeight: '600',
    color: Theme.colors.textPrimary,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.lg,
    backgroundColor: Theme.colors.surface,
    textAlign: 'center',
    fontSize: Theme.fontSizes['3xl'],
    fontWeight: '700',
    color: Theme.colors.textPrimary,
  },
  otpInputFilled: {
    borderColor: Theme.colors.primary,
  },
  otpInputError: {
    borderColor: Theme.colors.error,
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
  devNote: {
    backgroundColor: Theme.colors.info + '15',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.lg,
  },
  devNoteText: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.info,
  },
  devNoteCode: {
    fontWeight: '700',
    fontSize: Theme.fontSizes.lg,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: Theme.spacing.xl,
  },
  resendText: {
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  timerText: {
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.textSecondary,
  },
  bottom: {
    paddingHorizontal: Theme.layout.screenPadding,
    paddingBottom: Theme.spacing.xl,
  },
});

export default OTPVerificationScreen;
