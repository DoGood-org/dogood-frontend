'use client';

import { JSX } from 'react';
import { PayoutMethods } from './PayoutMethods';
import { StepLayout } from '../../StepLayout';

export const Payment = (): JSX.Element => {
  return (
    <StepLayout showBack={true}>
      <PayoutMethods />
    </StepLayout>
  );
};
