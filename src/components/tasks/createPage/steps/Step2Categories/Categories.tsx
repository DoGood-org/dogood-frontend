import { JSX } from 'react';
import { CategorySelection } from './CategorySelection';
import { DynamicStepLayout } from '../../DynamicStepLayout';

export const Categories = (): JSX.Element => {
  return (
    <DynamicStepLayout>
      <CategorySelection />
    </DynamicStepLayout>
  );
};
