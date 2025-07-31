'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { JSX, ReactNode } from 'react';

const stripePromise = loadStripe(
  'pk_test_51RqHtID06DK4hMNdwtG380NHOLLZ2oNzta2D2po6GwZE9NIgV3Dj7v0W8SSAQgn1nQC109RXd6y0F2dM54k1hokh007S25f5bh'
); // Замінити на live пізніше

type Theme = 'flat' | 'stripe' | 'night' | undefined;

const appearance = {
  theme: 'flat' as Theme,
  // variables: {
  //   colorBackground: 'var(--input-bg)',
  //   colorText: 'var(--text)',
  //   colorPrimary: 'var(--primary)',
  //   spacingUnit: '6px',
  // },
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
