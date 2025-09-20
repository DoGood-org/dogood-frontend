'use client';
import { AuthForm } from '@/components';
import { ForgotEnterEmail } from '@/components/main/auth/ForgotEnterEmail';
import { ForgotPassword } from '@/components/main/auth/ForgotPassword';
import { useRouter } from 'next/navigation';
import React from 'react';
import { authStore, useAuthFlow } from '@/zustand/stores/authStore';

export const LoginPageContent: React.FC = () => {
  const router = useRouter();
  const { step, setStep } = useAuthFlow();

  const { login, status, error } = authStore();

  React.useEffect(() => {
    if (step === 'success') {
      router.push('/');
    }
  }, [step, router]);

  return (
    <div className=" login text-foreground flex flex-col items-center justify-center w-full">
      {!step && (
        <AuthForm
          type="login"
          onForgotPassword={() => setStep('forgotEmail')}
          onFormSubmit={async (type, data) => {
            try {
              await login(data.email, data.password);
            } catch (error) {
              console.error('Login failed:', error);

              return;
            }
            setStep('success');
          }}
        />
      )}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && error && <p className="text-red-500">{error}</p>}

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
          <ForgotPassword
            onSubmit={(data) => {
              console.log('Forgot password submitted:', data);
              setStep('success');
              router.push('/login');
            }}
          />
        </div>
      )}
    </div>
  );
};
