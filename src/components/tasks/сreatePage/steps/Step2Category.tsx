'use client';

import { JSX } from 'react';
import { BackNextButtons } from '../Buttons/BackNextButtons';
import { StepHeader } from '../StepHeader';
import { Section } from '@/components/ui/Section';

export const Step2Category = (): JSX.Element => {
  return (
    <Section withContainer={true} className="mt-8 mb-8">
      <StepHeader step={2} />
      <BackNextButtons showBack={true} />
    </Section>
  );
};
