'use client';

import { IAuthResponse } from '@/zustand/services/authService';
import { authStore } from '@/zustand/stores/authStore';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { AuthForm } from './AuthForm';
import { VerifyViaEmail } from './VerififyViaEmail';
import { Spinner } from '@/components/ui/Spinner';
import { useAuthStep } from '@/hooks/useAuthStep';

export const LoginPageContent: React.FC = () => {
  const router = useRouter();
  const t = useTranslations('auth');

  const { step, emailFromUrl, setStep } = useAuthStep('/login');

  useEffect(() => {
    if (step === 'mistakeApi') {
      toast.error(t('toast.unexpectedError'));
      router.replace('/login');
    }
  }, [step, router, t]);

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
    return null;
  }

  return (
    <div className="login text-foreground flex flex-col items-center justify-center w-full">
      {status === 'loading' && <Spinner />}
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

                if (res?.status === 403 && res?.bannedUser) {
                  toast.error(t('toast.banned'));
                  router.replace('/account');
                  return;
                }

                if (res?.ok || res?.status === 200) {
                  toast.success(t('toast.loginSuccess'));
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
                  toast.error(t('toast.emailLoginNotFound'));
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
