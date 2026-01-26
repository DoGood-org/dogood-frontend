'use client';

import { JSX } from 'react';
import { StepLayout } from '../../StepLayout';
import { PayoutMethods } from './PayoutMethods';

export const Payment = (): JSX.Element => {
  return (
    <StepLayout showBack={true}>
      <PayoutMethods />
    </StepLayout>
  );
};
