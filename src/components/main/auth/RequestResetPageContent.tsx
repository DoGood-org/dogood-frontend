'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ForgotEnterEmail } from './ForgotEnterEmail';
import { authStore, useAuthFlow } from '@/zustand/stores/authStore';
import { JSX, useState } from 'react';
import { IAuthResponse } from '@/zustand/services/authService';
import { VerifyViaEmail } from './VerififyViaEmail';

export const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export const RequestToResetPageContent = (): JSX.Element => {
  const { requestToResetPassword } = authStore();
  const { step, setStep } = useAuthFlow();
  const [email, setEmail] = useState<string>('');

  return (
    <div>
      <AnimatePresence mode="wait">
        {step === 'forgotPasswordEnterEmail' && (
          <motion.div
            key="forgotPasswordEnterEmail"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: 'easeOut' }}
            layout
            className="mt-4 w-full flex justify-center"
          >
            <ForgotEnterEmail
              onSubmit={async (data: { email: string }) => {
                setEmail(data.email);
                console.log('Forgot email submitted:', data);
                const res: IAuthResponse = await requestToResetPassword(
                  data.email
                );
                console.log('Request to reset password response:', res);
                if (res.ok || res.status === 200) {
                  console.log('Password reset email sent successfully');
                  setStep('resetPassword');
                }
              }}
            />
          </motion.div>
        )}
        {step === 'resetPassword' && (
          <motion.div
            key="resetPasswordMessage"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: 'easeOut' }}
            layout
            className="mt-4 w-full flex justify-center"
          >
            <VerifyViaEmail
              onResend={() => requestToResetPassword(email)}
              onWrongEmail={() => setStep('forgotPasswordEnterEmail')}
              email={email}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
