'use client';

import { IAuthResponse } from '@/zustand/services/authService';
import { authStore } from '@/zustand/stores/authStore';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { AuthForm } from './AuthForm';
import { VerifyViaEmail } from './VerififyViaEmail';

export const LoginPageContent: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();

  const step = params.get('step');
  const emailFromUrl = params.get('email') ?? '';

  const setStep = (newStep: string | null, email?: string): void => {
    const query = new URLSearchParams(params.toString());

    if (newStep) {
      query.set('step', newStep);
    } else {
      query.delete('step');
    }

    if (email) {
      query.set('email', email);
    } else {
      query.delete('email');
    }

    const queryString = query.toString();
    router.replace(queryString ? `?${queryString}` : '/login', {
      scroll: false,
    });
  };

  const { login, status, error, resendVerificationEmail, nextResendAt } =
    authStore();

  const handleRequestToResetPassword = (email?: string): void => {
    const url = email
      ? `/reset-password?email=${encodeURIComponent(email)}`
      : '/reset-password';
    router.replace(url);
  };

  const variants: Variants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  if (step === 'mistakeApi') {
    toast.error('An unexpected error occurred. Please try again later.');
    router.replace('/');
    return null;
  }

  return (
    <div className="login text-foreground flex flex-col items-center justify-center w-full">
      <AnimatePresence mode="wait">
        {!step && (
          <motion.div
            key="login"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: 'easeOut' }}
            layout
            className="w-full flex justify-center"
          >
            <AuthForm
              type="login"
              onForgotPassword={() => handleRequestToResetPassword()}
              onFormSubmit={async (_, data) => {
                const res: IAuthResponse = await login(
                  data.email,
                  data.password
                );

                if (res?.ok || res?.status === 200) {
                  router.replace('/account');
                  return;
                }

                if (res?.status === 400) {
                  toast.error(res.errorMessage);
                  return;
                }

                if (res?.status === 403) {
                  toast.warn(res.errorMessage);
                  setStep('verification', data.email);
                  return;
                }

                if (res?.status === 401) {
                  handleRequestToResetPassword(data.email);
                  return;
                }
              }}
              errorMessage={
                status === 'apiError' ? error || undefined : undefined
              }
            />
          </motion.div>
        )}

        {step === 'verification' && (
          <motion.div
            key="verification"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: 'easeOut' }}
            layout
            className="mt-4 w-full flex justify-center"
          >
            <VerifyViaEmail
              email={emailFromUrl}
              nextResendAt={nextResendAt}
              onResend={async () => {
                if (emailFromUrl) {
                  await resendVerificationEmail(emailFromUrl);
                } else {
                  toast.error(
                    'Email address not found. Please try logging in again.'
                  );
                  setStep(null);
                }
              }}
              onWrongEmail={() => {
                setStep(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
