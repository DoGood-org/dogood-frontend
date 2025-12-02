'use client';

import { JSX } from 'react';
import { UiSuccessMessage } from '@/components/ui/UiSuccessMessage';
import { ActionButtons } from './ActionButtons';

export const PaymentSuccessContent = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center">
      <UiSuccessMessage />
      <ActionButtons />
    </section>
  );
};
