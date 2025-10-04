'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { DonationModalForm } from './DonationModalForm';
import { JSX } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export const DonationModalContent = (): JSX.Element => {
  return (
    <Elements stripe={stripePromise}>
      <h2 className="text-center mb-4 text-base">Payment</h2>
      <DonationModalForm />
    </Elements>
  );
};
