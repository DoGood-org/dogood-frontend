'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ReactNode, JSX } from 'react';
import { cn } from '@/lib/utils';

interface ScrollboxProps {
  children: ReactNode;
  className?: string;
  viewportClassName?: string;
}

export const Scrollbox = ({
  children,
  className,
  viewportClassName,
}: ScrollboxProps): JSX.Element => {
  return (
    <ScrollArea.Root className={cn('overflow-hidden', className)}>
      <ScrollArea.Viewport className={cn('h-full w-full', viewportClassName)}>
        {children}
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-[#ffffff] shadow-inner transition-colors duration-150 ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 bg-[#7A7A7A7A] rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
};
