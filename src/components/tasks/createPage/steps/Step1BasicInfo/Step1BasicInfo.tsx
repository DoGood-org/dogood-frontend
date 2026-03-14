'use client';

import { JSX } from 'react';
import { StepHeader } from '../../StepHeader';
import { BasicInfo } from './BasicInfo';
import { Section } from '@/components/ui/Section';
import { STEP_IDS } from '@/constants/stepIds';

export const Step1BasicInfo = (): JSX.Element => {
  return (
    <Section className="md:my-8 lg:my-8">
      <StepHeader stepId={STEP_IDS.BASIC} />
      <BasicInfo />
    </Section>
  );
};
