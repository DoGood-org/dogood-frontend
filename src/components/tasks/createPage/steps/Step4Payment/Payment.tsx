'use client';

import { JSX } from 'react';
import { PayoutMethods } from './PayoutMethods';
import { DynamicStepLayout } from '../../DynamicStepLayout';

export const Payment = (): JSX.Element => {
  return (
    <DynamicStepLayout>
      <PayoutMethods />
    </DynamicStepLayout>
  );
};
