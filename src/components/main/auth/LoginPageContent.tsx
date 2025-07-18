'use client';
import { AuthForm } from '@/components';
import Forgot from '@/components/main/auth/Forgot';
import { ForgotEnterEmail } from '@/components/main/auth/ForgotEnterEmail';
import React, { useState } from 'react';

export const LoginPageContent: React.FC = () => {
  const [step, setStep] = useState<
    null | 'success' | 'forgotPassword' | 'forgotEmail'
  >(null);
  return (
    <div className=" login text-foreground flex flex-col items-center justify-center w-full">
      {!step && (
        <AuthForm
          type="login"
          onForgotPassword={() => setStep('forgotEmail')}
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

      {step === 'forgotEmail' && (
        <div className="mt-4">
          <ForgotEnterEmail
            onSubmit={(data) => {
              console.log('Forgot email submitted:', data);
              setStep('forgotPassword');
            }}
          />
        </div>
      )}
      {step === 'forgotPassword' && (
        <div className="mt-4">
          <Forgot
            onSubmit={(data) => {
              console.log('Forgot password submitted:', data);
              setStep('success');
            }}
          />
        </div>
      )}
    </div>
  );
};
