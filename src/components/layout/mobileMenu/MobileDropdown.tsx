'use client';

import React from 'react';
import { MobileDropdownProps } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from '@/components';
import { CaretDown } from '@/components/icons';
import { useIconComponents } from '@/hooks';

export const MobileDropdown = ({
  trigger,
  children,
  icon = '',
  navItem,
  openItem,
  setOpenItem,
}: MobileDropdownProps): React.JSX.Element => {
  const icons = useIconComponents();

  const handleAccordionValueChange = (value: string): void => {
    const next = value === openItem ? '' : value;
    setOpenItem(next);
  };

  return (
    <Accordion
      type="single"
      collapsible
      value={openItem}
      onValueChange={handleAccordionValueChange}
    >
      <AccordionItem key={navItem.title} value={navItem.title}>
        <AccordionTrigger>
          <Button asChild variant="ghost" size="md">
            <div className="py-4 max-lg:px-0 focus:outline-none flex gap-5 items-center cursor-pointer hover:border-transparent w-full">
              {icons[icon as keyof typeof icons]}
              <div className="flex justify-between w-full">
                {trigger}
                <CaretDown
                  className={`stroke-current transition-transform duration-700 size-6 ${
                    openItem === navItem.title ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
          </Button>
        </AccordionTrigger>
        <AccordionContent className="pl-10">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
