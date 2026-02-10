'use client';

import { JSX } from 'react';
import { CategorySelection } from './CategorySelection';
import { StepLayout } from '../../StepLayout';

export const Categories = (): JSX.Element => {
  return (
    <StepLayout showBack={true}>
      <CategorySelection />
    </StepLayout>
  );
};
