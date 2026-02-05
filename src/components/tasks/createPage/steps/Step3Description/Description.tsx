'use client';

import { JSX } from 'react';
import { DescriptionForm } from './DescriptionForm';
import { DynamicStepLayout } from '../../DynamicStepLayout';

export const Description = (): JSX.Element => {
  return (
    <DynamicStepLayout>
      <DescriptionForm />
    </DynamicStepLayout>
  );
};
