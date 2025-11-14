'use client';

import { JSX } from 'react';
import { ActionButtons, UiSuccessMessage } from '@/components';

export const PaymentSuccessContent = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center">
      <UiSuccessMessage />
      <ActionButtons />
    </section>
  );
};
