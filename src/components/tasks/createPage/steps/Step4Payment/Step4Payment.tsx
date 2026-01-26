'use client';
import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import { StepHeader } from '../../StepHeader';
import { Payment } from './Payment';

export const Step4Payment = (): JSX.Element => {
  return (
    <Section withContainer={true} className="mt-8 mb-8">
      <StepHeader step={4} />
      <Payment />
    </Section>
  );
};
