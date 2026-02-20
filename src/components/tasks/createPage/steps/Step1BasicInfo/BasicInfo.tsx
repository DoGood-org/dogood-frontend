'use client';

import { JSX } from 'react';
import { BasicInfoForm } from './BasicInfoForm';
import { StepLayout } from '@/components/tasks/createPage/StepLayout';

export const BasicInfo = (): JSX.Element => {
  return (
    <StepLayout showBack={false}>
      <BasicInfoForm />
    </StepLayout>
  );
};
