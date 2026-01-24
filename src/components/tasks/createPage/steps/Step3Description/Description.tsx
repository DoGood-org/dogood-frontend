'use client';

import { JSX } from 'react';
import { StepLayout } from '../../StepLayout';
import { DescriptionForm } from './DescriptionForm';

export const Description = (): JSX.Element => {
  return (
    <StepLayout showBack={true}>
      <DescriptionForm />
    </StepLayout>
  );
};
