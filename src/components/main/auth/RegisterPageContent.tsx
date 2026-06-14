'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { AuthForm } from './AuthForm';
import { FormRegister } from '@/types/authType';
import { VerifyViaEmail } from '@/components/main/auth/VerififyViaEmail';
import { authStore } from '@/zustand/stores/authStore';
import { IAuthResponse } from '@/zustand/services/authService';
import { useTranslations } from 'next-intl';
import { Spinner } from '@/components/ui/Spinner';
import { useAuthStep } from '@/hooks/useAuthStep';

export const RegisterPageContent = (): React.ReactElement => {
  const router = useRouter();
  const t = useTranslations('auth');

  const { step, emailFromUrl, setStep } = useAuthStep('/register');

  const { register, status, resendVerificationEmail, nextResendAt } =
    authStore();

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

  const handleRegisterSubmit = async (data: FormRegister): Promise<void> => {
    setPersonFormData(data);

    try {
      const response: IAuthResponse = await register(
        data.email,
        data.password,
        data.name
      );

      if (response.ok) {
        toast.success(t('toast.registerSuccess'));
        setStep('verification', data.email);
        return;
      }

      if (response.errorMessage?.toLowerCase().includes('exists')) {
        toast.error(t('toast.emailAlreadyExists'));
      } else {
        toast.error(response.errorMessage || t('toast.unknownError'));
      }
    } catch (_error) {
      toast.error(t('toast.unknownError'));
    }
  };
  return (
    <div className="flex flex-col items-center justify-center text-foreground w-full">
      {status === 'loading' && <Spinner />}
      {!step && (
        <AuthForm
          type="registerPerson"
          onFormSubmit={async (_, data) => {
            await handleRegisterSubmit(data as FormRegister);
          }}
        />
      )}

      {step === 'verification' && (
        <VerifyViaEmail
          email={emailFromUrl}
          type="register"
          nextResendAt={nextResendAt}
          onResend={async () => {
            if (emailFromUrl) {
              await resendVerificationEmail(emailFromUrl);
            } else {
              toast.error(t('toast.emailRegisterNotFound'));
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
            await handleRegisterSubmit(data as FormRegister);
          }}
        />
      )}

      {step === 'resendLink' && (
        <VerifyViaEmail
          email={emailFromUrl}
          type="register"
          nextResendAt={nextResendAt}
          onResend={async () => {
            if (emailFromUrl) {
              await resendVerificationEmail(emailFromUrl);
            }
          }}
          onWrongEmail={() => setStep(null)}
        />
      )}
    </div>
  );
};
