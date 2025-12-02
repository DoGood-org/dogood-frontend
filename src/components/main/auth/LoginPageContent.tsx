'use client';

import { ForgotEnterEmail } from '@/components/main/auth/ForgotEnterEmail';
import { ForgotPassword } from '@/components/main/auth/ForgotPassword';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { authStore, useAuthFlow } from '@/zustand/stores/authStore';
import { IAuthResponse } from '@/zustand/services/authService';
import { safeNext } from './safeNextPath';
import { AuthForm } from './AuthForm';

export const LoginPageContent: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const next = useMemo(() => safeNext(params.get('next')), [params]);
  const { step, setStep } = useAuthFlow();

  const { login, status, error, currentUser } = authStore();

  return (
    <div className=" login text-foreground flex flex-col items-center justify-center w-full">
      {' '}
      {status === 'apiError' && error && (
        <p className="text-red-500">{error}</p>
      )}{' '}
      {status === 'loading' && <p>Loading...</p>}
      {!step && (
        <AuthForm
          type="login"
          onForgotPassword={() => setStep('forgotEmail')}
          onFormSubmit={async (type, data) => {
            const res: IAuthResponse = await login(data.email, data.password);
            if (res.status === 'success') {
              await currentUser({ silent: true });
              router.replace(next);
            }
          }}
        />
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
          <ForgotPassword
            onSubmit={(data) => {
              console.log('Reset password submitted:', data);
              setStep(null);
              router.replace('/login');
            }}
          />
        </div>
      )}
    </div>
  );
};
