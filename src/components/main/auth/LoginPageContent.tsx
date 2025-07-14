'use client';
import { AuthForm } from '@/components';
import Forgot from '@/components/main/auth/Forgot';
import React, { useState } from 'react';

export const LoginPageContent: React.FC = () => {
  const [step, setStep] = useState<null | 'success' | 'forgot'>(null);
  return (
    <div className=" login text-foreground flex flex-col items-center justify-center w-full">
      {!step && (
        <AuthForm
          type="login"
          onForgotPassword={() => setStep('forgot')}
          onFormSubmit={(type, data) => {
            console.log('Login person:', type, data);
          }}
        />
      )}
      {step === 'success' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Login Successful</h2>
          <p>Welcome back!</p>
        </div>
      )}
      {step === 'forgot' && (
        <div className="mt-4">
          <Forgot />
        </div>
      )}
    </div>
  );
};
