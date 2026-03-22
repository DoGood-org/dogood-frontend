'use client';

import { JSX } from 'react';
import { StepHeader } from '@/components/tasks/createTaskPage/StepHeader';
import { Description } from './Description';
import { Section } from '@/components/ui/Section';
import { STEP_IDS } from '@/constants/stepIds';

export const Step3Description = (): JSX.Element => {
  return (
    <Section withContainer={true} className="mt-8 mb-8">
      <StepHeader stepId={STEP_IDS.DESCRIPTION} />
      <Description />
    </Section>
  );
};
