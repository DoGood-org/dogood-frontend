'use client';

import { JSX, ReactNode } from 'react';

interface WizardSectionProps {
  children: ReactNode;
  className?: string;
}

export const StepCard = ({
  children,
  className = '',
}: WizardSectionProps): JSX.Element => {
  return (
    <section
      className={`
        rounded-xl
        bg-[#cfcfcf] dark:bg-[#303030]
        px-4
        py-12
        md:p-12
        ${className}
      `}
    >
      {children}
    </section>
  );
};
