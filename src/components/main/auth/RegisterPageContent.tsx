'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { AuthForm } from './AuthForm';
import { FormRegister } from '@/types/authType';
import { VerifyViaEmail } from '@/components/main/auth/VerififyViaEmail';
import { authStore } from '@/zustand/stores/authStore';
import { IAuthResponse } from '@/zustand/services/authService';

export const RegisterPageContent = (): React.ReactElement => {
  const router = useRouter();
  const params = useSearchParams();

  const step = params.get('step');
  const emailFromUrl = params.get('email') ?? '';

  const setStep = (step: string | null, email?: string): void => {
    const query = new URLSearchParams(params.toString());
    if (step) {
      query.set('step', step);
    } else {
      query.delete('step');
    }

    if (email) {
      query.set('email', email);
    } else {
      query.delete('email');
    }

    const queryString = query.toString();
    router.replace(queryString ? `/register?${queryString}` : '/register', {
      scroll: false,
    });
  };

  const {
    register,
    status,
    isEmailVerified,
    resendVerificationEmail,
    nextResendAt,
  } = authStore();

  const [formPersonData, setPersonFormData] = useState<FormRegister>({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  useEffect(() => {
    if (status === 'apiError') {
      router.replace('/');
    }
  }, [status, router]);

  return (
    <div className="flex flex-col items-center justify-center text-foreground w-full">
      {!step && (
        <AuthForm
          type="registerPerson"
          onFormSubmit={async (_, data) => {
            const personData = data as FormRegister;
            setPersonFormData(personData);

            const response: IAuthResponse = await register(
              personData.email,
              personData.password,
              personData.name
            );

            if (response.ok) {
              setStep('verification', personData.email);
            }
          }}
        />
      )}

      {step === 'verification' && (
        <VerifyViaEmail
          email={emailFromUrl}
          nextResendAt={nextResendAt}
          onResend={async () => {
            if (emailFromUrl) {
              await resendVerificationEmail(emailFromUrl);
            } else {
              toast.error('Email not found. Please register again.');
              setStep(null);
            }
          }}
          onWrongEmail={() => {
            setStep('mistakeInEmail', emailFromUrl);
          }}
        />
      )}

      {step === 'mistakeInEmail' && (
        <AuthForm
          type="registerPerson"
          defaultValues={{
            ...formPersonData,
            password: '',
            repeatPassword: '',
          }}
          onFormSubmit={async (_, data) => {
            const personData = data as FormRegister;
            const response = await register(
              personData.email,
              personData.password,
              personData.name
            );
            if (response.ok) {
              setStep('verification', personData.email);
            }
          }}
        />
      )}

      {step === 'resendLink' && (
        <VerifyViaEmail
          email={emailFromUrl}
          nextResendAt={nextResendAt}
          onResend={async () => {
            if (emailFromUrl) {
              await resendVerificationEmail(emailFromUrl);
            }
          }}
          onWrongEmail={() => setStep(null)}
        />
      )}

      {step === 'proceedToLogin' && isEmailVerified && (
        <div>
          <p>Registration successful!</p>
          <p>Redirecting to login...</p>
        </div>
      )}
    </div>
  );
};
