import React, { useState } from 'react';
import { WelcomeScreen, PhoneLoginScreen, OTPVerificationScreen } from '@screens/auth';

type AuthStep = 'welcome' | 'phone' | 'otp';

interface AuthNavigatorProps {
  onAuthComplete: () => void;
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ onAuthComplete }) => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('welcome');

  const handleGetStarted = () => {
    setCurrentStep('phone');
  };

  const handleOTPSent = () => {
    setCurrentStep('otp');
  };

  const handleBackToWelcome = () => {
    setCurrentStep('welcome');
  };

  const handleBackToPhone = () => {
    setCurrentStep('phone');
  };

  const handleVerified = () => {
    // Authentication complete - user is now signed in
    onAuthComplete();
  };

  // Render current step
  switch (currentStep) {
    case 'welcome':
      return <WelcomeScreen onGetStarted={handleGetStarted} />;

    case 'phone':
      return <PhoneLoginScreen onOTPSent={handleOTPSent} onBack={handleBackToWelcome} />;

    case 'otp':
      return <OTPVerificationScreen onVerified={handleVerified} onBack={handleBackToPhone} />;

    default:
      return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }
};
