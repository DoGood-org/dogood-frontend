'use client';

import { JSX } from 'react';
import { CategorySelection } from './CategorySelection';
import { StepLayout } from '@/components/tasks/createPage/StepLayout';

export const Categories = (): JSX.Element => {
  return (
    <StepLayout showBack={true}>
      <CategorySelection />
    </StepLayout>
  );
};
