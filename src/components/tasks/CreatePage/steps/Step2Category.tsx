'use client';

import { JSX } from 'react';
import { BackNextButtons } from '../buttons/BackNextButtons';
import { StepHeader } from '../StepHeader';

export const Step2Category = (): JSX.Element => {
  return (
    <>
      <StepHeader step={2} />
      <BackNextButtons showBack={true} />
    </>
  );
};
