'use client';
import { JSX } from 'react';
import { StepHeader } from '../../StepHeader';
import { BasicInfo } from './BasicInfo';
import { Section } from '@/components/ui/Section';

export const Step1BasicInfo = (): JSX.Element => {
  return (
    <Section withContainer={true} className="md:my-8 lg:my-8">
      <StepHeader step={1} />
      <BasicInfo />
    </Section>
  );
};
