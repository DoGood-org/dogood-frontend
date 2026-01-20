import { JSX } from 'react';
import { StepLayout } from '../../StepLayout';
import { CategorySelection } from './CategorySelection';

export const Categories = (): JSX.Element => {
  return (
    <StepLayout showBack={true}>
      <CategorySelection />
    </StepLayout>
  );
};
