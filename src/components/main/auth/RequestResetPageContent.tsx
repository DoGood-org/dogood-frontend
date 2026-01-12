'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ForgotEnterEmail } from './ForgotEnterEmail';
import { authStore, useAuthFlow } from '@/zustand/stores/authStore';
import { JSX, useEffect, useState } from 'react';
import { IAuthResponse } from '@/zustand/services/authService';
import { VerifyViaEmail } from './VerififyViaEmail';
import { toast, ToastOptions } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export const RequestToResetPageContent = (): JSX.Element => {
  const { requestToResetPassword } = authStore();
  const { step, setStep } = useAuthFlow();
  const [email, setEmail] = useState<string>('');
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 4;
  const RESEND_COOLDOWN = 60_000;

  const [nextResendAt, setNextResendAt] = useState<number | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (attempts >= MAX_ATTEMPTS) {
      toast('Maximum attempts reached. Redirecting to main page.');
      router.replace('/');
    }
  }, [attempts, router]);
  return (
    <div>
      <AnimatePresence mode="wait">
        {(step === 'forgotPasswordEnterEmail' || step === null) && (
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
                if (res.ok) {
                  toast.success('Password reset email sent');
                  setStep('resetPassword');
                  toast.dismiss();
                } else {
                  const options: ToastOptions = {
                    autoClose: false,
                  };

                  toast(
                    <div>
                      <p>Failed to email! Check address.</p>
                      <div className="flex gap-2 text-white items-center">
                        <Button
                          className="px-2 py-1"
                          onClick={async () => {
                            toast.dismiss();
                            setAttempts((x) => x + 1);
                          }}
                          disabled={attempts === MAX_ATTEMPTS - 1}
                        >
                          {attempts === MAX_ATTEMPTS - 1
                            ? 'No attempts left'
                            : 'Try again'}
                        </Button>

                        <Button
                          onClick={() => {
                            router.replace('/');
                          }}
                        >
                          Go to main
                        </Button>
                      </div>
                    </div>,
                    options
                  );
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
              onResend={async () => {
                const now = Date.now();

                if (nextResendAt && now < nextResendAt) {
                  const secondsLeft = Math.ceil((nextResendAt - now) / 1000);
                  toast.error(`You can resend in ${secondsLeft}s`);
                  return;
                }

                setNextResendAt(now + RESEND_COOLDOWN);
                const res: IAuthResponse = await requestToResetPassword(email);
                if (res.ok) {
                  toast.success('Password reset email resent');
                } else {
                  toast.error('Failed to resend password reset email');
                }
              }}
              onWrongEmail={() => setStep('forgotPasswordEnterEmail')}
              email={email}
              nextResendAt={nextResendAt}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
