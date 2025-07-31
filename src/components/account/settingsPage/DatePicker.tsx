'use client';

import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Input } from '@/components';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative">
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
          <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-form-field" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-text-gray" align="end">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          captionLayout="dropdown"
          className="w-full h-[320px] text-form-field border-none"
        />
      </PopoverContent>
    </Popover>
  );
};
