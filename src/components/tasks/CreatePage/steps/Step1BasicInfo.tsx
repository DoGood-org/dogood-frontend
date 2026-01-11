'use client';
import { JSX } from 'react';
import { BackNextButtons } from '../buttons/BackNextButtons';
import { StepHeader } from '../StepHeader';

export const Step1BasicInfo = (): JSX.Element => {
  return (
    <div>
      <StepHeader step={1} />
      <BackNextButtons showBack={false} />
    </div>
  );
};
