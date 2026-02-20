'use client';

import { JSX } from 'react';
import { DescriptionForm } from './DescriptionForm';
import { StepLayout } from '@/components/tasks/createPage/StepLayout';

export const Description = (): JSX.Element => {
  return (
    <StepLayout showBack={true}>
      <DescriptionForm />
    </StepLayout>
  );
};
