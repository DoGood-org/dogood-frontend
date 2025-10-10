import { cn } from '@/lib/utils';
import { JSX, ReactNode } from 'react';

export const DonationInputWrapper = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <div
      className={cn(
        'h-12 bg-[#ffffff] rounded-sm relative flex items-center p-3 focus-within:ring-1 focus-within:ring-[#00c1ac]',
        className
      )}
    >
      {children}
    </div>
  );
};
