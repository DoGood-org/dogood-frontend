'use client';

import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import { StepHeader } from '@/components/tasks/createPage/StepHeader';
import { Categories } from './Categories';

export const Step2Category = (): JSX.Element => {
  return (
    <Section withContainer={true} className="mt-8 mb-8">
      <StepHeader step={2} />
      <Categories />
    </Section>
  );
};
