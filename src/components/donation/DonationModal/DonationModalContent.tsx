'use client';

import { DonationModalForm } from './DonationModalForm';
import { JSX } from 'react';

export const DonationModalContent = (): JSX.Element => {
  return (
    <section>
      <h2 className="text-center mb-4 text-base">Payment</h2>
      <DonationModalForm />
    </section>
  );
};
