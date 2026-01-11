import { JSX, ReactNode } from 'react';

interface WizardSectionProps {
  children: ReactNode;
  className?: string;
}

export const CreateSection = ({
  children,
  className = '',
}: WizardSectionProps): JSX.Element => {
  return (
    <section
      className={`
        rounded-xl
        background-secondary
        px-12
        ${className}
      `}
    >
      {children}
    </section>
  );
};
