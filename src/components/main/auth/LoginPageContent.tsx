'use client';
import { AuthForm, safeNext, VerifyViaEmail } from '@/components';
import { ForgotEnterEmail } from '@/components/main/auth/ForgotEnterEmail';
import { ForgotPassword } from '@/components/main/auth/ForgotPassword';
import { IAuthResponse } from '@/zustand/services/authService';
import { authStore, useAuthFlow } from '@/zustand/stores/authStore';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';

export const LoginPageContent: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const next = useMemo(() => safeNext(params.get('next')), [params]);
  const { step, setStep } = useAuthFlow();
  const { login, status, error, currentUser } = authStore();

  const variants: Variants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };
  return (
    <div className=" login text-foreground flex flex-col items-center justify-center w-full">
      {status === 'apiError' && error && (
        <p className="text-red-500">{error}</p>
      )}

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
              onForgotPassword={() => setStep('forgotEmail')}
              onFormSubmit={async (type, data) => {
                const res: IAuthResponse = await login(
                  data.email,
                  data.password
                );
                console.log('Login response:', res);
                if (res?.ok || res.status === 200) {
                  const user = await currentUser({ silent: true });
                  console.log('Current user after login:', user);
                  return router.replace(next || '/');
                }
                console.log('Login response status code:', res?.status);
                if (res?.status === 403) {
                  setStep('verification');
                  return;
                }
                if (res?.status === 401) {
                  setStep('forgotPassword');
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
              onResend={() => {
                console.log('Resend verification email clicked');
              }}
              onWrongEmail={() => {
                console.log('Wrong email clicked');
                setStep(null);
              }}
            />
          </motion.div>
        )}
        {step === 'forgotEmail' && (
          <motion.div
            key="forgotEmail"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: 'easeOut' }}
            layout
            className="mt-4 w-full flex justify-center"
          >
            <ForgotEnterEmail
              onSubmit={(data) => {
                console.log('Forgot email submitted:', data);
                setStep('forgotPassword');
              }}
            />
          </motion.div>
        )}
        {step === 'forgotPassword' && (
          <motion.div
            key="forgotPassword"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: 'easeOut' }}
            layout
            className="mt-4 w-full flex justify-center"
          >
            <ForgotPassword
              onSubmit={(data) => {
                console.log('Reset password submitted:', data);
                setStep(null);
                router.replace('/login');
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
