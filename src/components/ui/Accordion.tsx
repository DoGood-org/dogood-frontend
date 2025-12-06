'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '@/lib/utils';
type AccordionProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
> & {
  isMobileMenu?: boolean;
};

function Accordion({
  children,
  isMobileMenu = false,
  ...props
}: AccordionProps): React.JSX.Element {
  return (
    <>
      {isMobileMenu ? (
        <AccordionPrimitive.Root asChild {...props}>
          <li className="list-none" data-slot="accordion">
            {children}
          </li>
        </AccordionPrimitive.Root>
      ) : (
        <AccordionPrimitive.Root data-slot="accordion" {...props}>
          {children}
        </AccordionPrimitive.Root>
      )}
    </>
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>): React.JSX.Element {
  return (
    <AccordionPrimitive.Item
      {...props}
      data-slot="accordion-item"
      className={cn('mb-[30px] last:mb-[0px]', className)}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>): React.JSX.Element {
  return (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group hover:cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-[8px] transition-all duration-700 outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 ',
          className
        )}
        {...props}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>): React.JSX.Element {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        'overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        className
      )}
      {...props}
    >
      <div className={cn('pt-0 pb-4 break-words')}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
