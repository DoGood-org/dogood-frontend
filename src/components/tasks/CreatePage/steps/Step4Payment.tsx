'use client';
import { JSX } from 'react';
import { BackNextButtons } from '../buttons/BackNextButtons';
import { StepHeader } from '../StepHeader';

export const Step4Payment = (): JSX.Element => {
  return (
    <>
      <StepHeader step={4} />
      <BackNextButtons showBack={true} />
    </>
  );
};
