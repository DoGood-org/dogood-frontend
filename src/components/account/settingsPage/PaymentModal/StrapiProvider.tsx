'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { JSX, ReactNode } from 'react';

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

const stripePromise = loadStripe(stripePublicKey); // Замінити на live пізніше

type Theme = 'flat' | 'stripe' | 'night' | undefined;

const appearance = {
  theme: 'flat' as Theme,
  wallets: {
    // applePay: 'never',
    // googlePay: 'never',
    link: 'never',
  },
  variables: {
    colorBackground: 'var(--white)',
    colorText: '#0D0D0D',
    // colorPrimary: 'var(--primary)',
    spacingUnit: '6px',
  },
};

export const StripeProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => (
  <Elements stripe={stripePromise} options={{ appearance }}>
    {children}
  </Elements>
);
