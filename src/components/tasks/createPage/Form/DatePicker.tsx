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
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  disabledDate?: (date: Date) => boolean;
}

export const DatePicker = ({
  value,
  onChange,
  onBlur,
  placeholder = 'Select date',
  className,
  disabledDate,
}: DatePickerProps): React.JSX.Element => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const handleSelect = (date?: Date): void => {
    onChange(date);
    if (date) setIsPopoverOpen(false);
    onBlur?.();
  };

  const handleOpenChange = (open: boolean): void => {
    setIsPopoverOpen(open);
    if (!open) {
      onBlur?.();
    }
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className="relative" onClick={() => setIsPopoverOpen(true)}>
          <Input
            readOnly
            value={value ? format(value, 'dd-MM-yyyy') : ''}
            placeholder={placeholder}
            className={cn(
              'w-full h-[48px] pr-10 cursor-pointer bg-white text-base text-black placeholder-[#010101] py-3 px-2',
              'focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
              'rounded-sm border-2 border-[#999999]',
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
          disabled={disabledDate}
          captionLayout="dropdown"
          className="w-full h-[320px] text-form-field border-none"
        />
      </PopoverContent>
    </Popover>
  );
};
