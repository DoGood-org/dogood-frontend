'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { JSX, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { authStore } from '@/zustand/stores/authStore';
import { IAuthResponse } from '@/zustand/services/authService';

import { ForgotEnterEmail } from './ForgotEnterEmail';
import { VerifyViaEmail } from './VerififyViaEmail';

export const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export const RequestToResetPageContent = (): JSX.Element => {
  const router = useRouter();
  const params = useSearchParams();

  const { requestToResetPassword } = authStore();

  const step = params.get('step') ?? 'enterEmail';
  const email = params.get('email') ?? '';

  const [attempts, setAttempts] = useState(0);
  const [nextResendAt, setNextResendAt] = useState<number | null>(null);

  const MAX_ATTEMPTS = 4;
  const COOLDOWN = 60_000;

  const setFlow = (nextStep: string, nextEmail?: string): void => {
    const query = new URLSearchParams(params.toString());

    query.set('step', nextStep);

    if (nextEmail) {
      query.set('email', nextEmail);
    } else {
      query.delete('email');
    }

    router.replace(`?${query.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (attempts >= MAX_ATTEMPTS) {
      toast('Maximum attempts reached.');
      router.replace('/');
    }
  }, [attempts, router]);

  return (
    <AnimatePresence mode="wait">
      {step === 'enterEmail' && (
        <motion.div
          key="email"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ForgotEnterEmail
            onSubmit={async (data) => {
              const res: IAuthResponse = await requestToResetPassword(
                data.email
              );

              if (res.ok) {
                toast.success('Reset email sent');
                setFlow('verify', data.email);
                return;
              }

              toast.error('Failed to send reset email. Check the address.');
            }}
          />
        </motion.div>
      )}

      {step === 'verify' && (
        <motion.div
          key="verify"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <VerifyViaEmail
            email={email}
            nextResendAt={nextResendAt}
            onWrongEmail={() => setFlow('enterEmail')}
            onResend={async () => {
              const now = Date.now();

              if (nextResendAt && now < nextResendAt) {
                const secondsLeft = Math.ceil((nextResendAt - now) / 1000);
                toast.error(
                  `Please wait ${secondsLeft} seconds before resending.`
                );
                return;
              }

              setNextResendAt(now + COOLDOWN);
              const res: IAuthResponse = await requestToResetPassword(email);

              if (!res.ok) {
                setAttempts((x) => x + 1);
                toast.error('Failed to resend password reset email.');
              } else {
                toast.success('Reset email resent successfully.');
              }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
