'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '@/lib/utils';

function Accordion({
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>): React.JSX.Element {
  return (
    <AccordionPrimitive.Root asChild {...props}>
      <li data-slot="accordion">{children}</li>
    </AccordionPrimitive.Root>
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
          'group hover:cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 transition-all duration-700 outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 ',
          className
        )}
        {...props}
      >
        <span className="flex-1 text-left w-fit pb-4 border-b-2 border-primary-200 border-foreground inline-block">
          {children}
        </span>
        <svg
          className="w-5 h-5 text-gray-400 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:transform group-data-[state=open]:transition-transform"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          data-state-open="rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
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
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-x-visible text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-4 break-words', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
