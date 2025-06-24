import React from 'react';
import { Container } from './Container';
import { SectionProps } from '@/types';
import { cn } from '@/lib/utils';

export const Section = ({
  children,
  className = '',
  withContainer = true,
}: SectionProps): React.JSX.Element => {
  const content = withContainer ? <Container>{children}</Container> : children;
  return (
    <section
      className={cn(
        'py-[30px] lg:py-[50px] bg-background transition-color transition-background duration-800',
        className
      )}
    >
      {content}
    </section>
  );
};
