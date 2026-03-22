'use client';

import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import { StepHeader } from '@/components/tasks/createTaskPage/StepHeader';
import { Payment } from './Payment';
import { STEP_IDS } from '@/constants/stepIds';

export const Step4Payment = (): JSX.Element => {
  return (
    <Section withContainer={true} className="mt-8 mb-8">
      <StepHeader stepId={STEP_IDS.PAYMENT} />
      <Payment />
    </Section>
  );
};
