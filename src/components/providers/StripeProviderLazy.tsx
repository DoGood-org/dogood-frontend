'use client';

import { Elements } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';
import { JSX, ReactNode, useState, useEffect } from 'react';
import { getStripe } from '@/services/stripeService';

type StripeProviderProps = {
  children: ReactNode;
};

export const StripeProviderLazy = ({
  children,
}: StripeProviderProps): JSX.Element => {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    // Завантажуємо Stripe тільки при першому рендері (або коли модалка відкрита)
    setStripePromise(getStripe());
    // }
  }, []);

  const appearance = {
    theme: 'flat' as const,
    variables: {
      colorBackground: '#fff',
      colorText: '#0D0D0D',
      spacingUnit: '6px',
    },
  };

  // Поки Stripe не ініціалізований — не рендеримо Elements
  if (!stripePromise) return <>{children}</>;

  return (
    <Elements stripe={stripePromise} options={{ appearance }}>
      {children}
    </Elements>
  );
};
