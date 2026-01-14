'use client';
import { JSX } from 'react';
import { BackNextButtons } from '../Buttons/BackNextButtons';
import { StepHeader } from '../StepHeader';

export const Step3Description = (): JSX.Element => {
  return (
    <>
      <StepHeader step={3} />
      <BackNextButtons showBack={true} />
    </>
  );
};
