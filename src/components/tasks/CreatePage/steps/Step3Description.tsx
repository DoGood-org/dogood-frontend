'use client';
import { JSX } from 'react';
import { BackNextButtons } from '../buttons/BackNextButtons';
import { StepHeader } from '../StepHeader';

export const Step3Description = (): JSX.Element => {
  return (
    <>
      <StepHeader step={3} />
      <BackNextButtons showBack={true} />
    </>
  );
};
