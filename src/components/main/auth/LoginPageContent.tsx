'use client';
import { FormLogin } from '@/types';
import { IAuthResponse } from '@/zustand/services/authService';
import { authStore, useAuthFlow } from '@/zustand/stores/authStore';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { safeNext } from './safeNextPath';
import { AuthForm } from './AuthForm';
import { VerifyViaEmail } from './VerififyViaEmail';

export const LoginPageContent: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const next = useMemo(() => safeNext(params.get('next')), [params]);
  const { step, setStep } = useAuthFlow();
  const {
    login,
    status,
    error,
    currentUser,

    resendVerificationEmail,
    nextResendAt,
  } = authStore();
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: '',
    password: '',
  });

  console.log(step, status);

  const handleRequestToResetPassword = (): void => {
    setStep('forgotPasswordEnterEmail');
    router.replace('/reset-password');
  };

  const variants: Variants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };
  return (
    <div className=" login text-foreground flex flex-col items-center justify-center w-full">
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
              onFormSubmit={async (type, data) => {
                const res: IAuthResponse = await login(
                  data.email,
                  data.password
                );
                console.log('login res', res);
                setFormLogin({ email: data.email, password: '' });
                if (res?.ok || res.status === 200) {
                  await currentUser({ silent: true });
                  return router.replace(next || '/');
                }
                if (res?.status === 400) {
                  toast.error(res.errorMessage);
                }
                if (res?.status === 403) {
                  setStep('verification');
                  toast.warn(res.errorMessage);
                  return;
                }
                if (res?.status === 401) {
                  setStep('forgotPasswordEnterEmail');
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
              onResend={async () => {
                await resendVerificationEmail(formLogin.email);
              }}
              onWrongEmail={() => setStep(null)}
              email={formLogin.email}
              nextResendAt={nextResendAt}
            />
          </motion.div>
        )}
        {step === 'mistakeApi' &&
          (toast.error('An unexpected error occurred. Please try again later.'),
          router.replace('/'),
          null)}
      </AnimatePresence>
    </div>
  );
};
