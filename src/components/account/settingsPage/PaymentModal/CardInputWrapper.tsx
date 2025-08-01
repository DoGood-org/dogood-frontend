import { cn } from '@/lib/utils';
import { JSX, ReactNode } from 'react';

export const CardInputWrapper = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <div
      className={cn(
        'h-12 bg-white rounded-lg relative flex items-center p-3 border border-transparent focus-within:ring-1 focus-within:ring-border',
        className
      )}
    >
      {children}
    </div>
  );
};
