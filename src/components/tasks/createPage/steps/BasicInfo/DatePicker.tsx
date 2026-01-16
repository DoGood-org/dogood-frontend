'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Input } from '@/components/ui/Input';
import { Calendar } from '@/components/ui/Calendar';
import { CalendarIcon } from '@/components/icons';

interface DatePickerProps {
  value?: Date;
  onChange: (date?: Date) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const DatePicker = ({
  value,
  onChange,
  placeholder = 'Select date',
  className,
  disabled = false,
}: DatePickerProps): React.JSX.Element => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const handleSelect = (date?: Date): void => {
    onChange(date);
    if (date) setIsPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div
          className="relative"
          onClick={() => !disabled && setIsPopoverOpen(true)}
        >
          <Input
            readOnly
            disabled={disabled}
            value={value ? format(value, 'dd-MM-yyyy') : ''}
            placeholder={placeholder}
            className={cn(
              'w-full h-[48px] pr-10 cursor-pointer bg-white text-base text-black placeholder-[#010101] py-3 px-2',
              'focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
              'rounded-sm border-2 border-[#999999]',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
          />
          <CalendarIcon className="absolute w-6 h-6 right-3 top-1/2 -translate-y-1/2" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-text-gray" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          disabled={(date) => date > new Date()}
          captionLayout="dropdown"
          className="w-full h-[320px] text-form-field border-none"
        />
      </PopoverContent>
    </Popover>
  );
};
