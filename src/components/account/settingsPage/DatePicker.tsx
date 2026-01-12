'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { format, isAfter, subYears } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarDots } from '@/components/icons';
import { Input } from '@/components/ui/Input';

interface DatePickerProps {
  value?: Date;
  onChange: (date?: Date) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const DatePicker = ({
  value,
  onChange,
  className,
  placeholder = 'Select date',
  disabled = false,
}: DatePickerProps): React.JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleSelect = (date?: Date): void => {
    onChange(date);
    if (date) setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative" onClick={() => !disabled && setOpen(true)}>
          <Input
            readOnly
            disabled={disabled}
            value={value ? format(value, 'PPP') : ''}
            placeholder={placeholder}
            className={cn(
              'w-full pr-10 cursor-pointer bg-white border-none text-form-field text-base',
              className,
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          />
          <CalendarDots className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-form-field" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-text-gray" align="end">
        <Calendar
          mode="single"
          selected={value || undefined}
          onSelect={handleSelect}
          disabled={(date) =>
            disabled || isAfter(date, subYears(new Date(), 13))
          }
          captionLayout="dropdown"
          className="w-full h-[320px] text-form-field border-none"
        />
      </PopoverContent>
    </Popover>
  );
};
