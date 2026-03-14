'use client';

import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import { StepHeader } from '@/components/tasks/createPage/StepHeader';
import { Categories } from './Categories';
import { STEP_IDS } from '@/constants/stepIds';

export const Step2Category = (): JSX.Element => {
  return (
    <Section withContainer={true} className="mt-8 mb-8">
      <StepHeader stepId={STEP_IDS.CATEGORY} />
      <Categories />
    </Section>
  );
};
