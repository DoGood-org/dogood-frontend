'use client';

import { JSX } from 'react';
import { DescriptionForm } from './DescriptionForm';
import { StepLayout } from '../../StepLayout';

export const Description = (): JSX.Element => {
  return (
    <StepLayout showBack={true}>
      <DescriptionForm />
    </StepLayout>
  );
};
