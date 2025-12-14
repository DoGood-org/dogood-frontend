'use client';
import { AuthForm, safeNext, VerifyViaEmail } from '@/components';
import { FormLogin } from '@/types';
import { IAuthResponse } from '@/zustand/services/authService';
import { authStore, useAuthFlow } from '@/zustand/stores/authStore';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

export const LoginPageContent: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const next = useMemo(() => safeNext(params.get('next')), [params]);
  const { step, setStep } = useAuthFlow();
  const { login, status, error, currentUser } = authStore();
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: '',
    password: '',
  });
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
              onForgotPassword={() => handleRequestToResetPassword()}
              onFormSubmit={async (type, data) => {
                const res: IAuthResponse = await login(
                  data.email,
                  data.password
                );
                setFormLogin({ email: data.email, password: '' });
                console.log('Login response:', res);
                if (res?.ok || res.status === 200) {
                  const user = await currentUser({ silent: true });
                  console.log('Current user after login:', user);
                  toast.success('Login successful');
                  return router.replace(next || '/');
                }
                console.log('Login response status code:', res?.status);
                if (res?.status === 403) {
                  setStep('verification');
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
              onResend={(): void => {
                console.log('Resend verification email clicked');
              }}
              onWrongEmail={(): void => {
                console.log('Wrong email clicked');
                setStep(null);
              }}
              email={formLogin.email}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
