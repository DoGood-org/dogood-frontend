'use client';

import { cn } from '@/lib/utils';
import { SelectProps } from '@radix-ui/react-select';
import { JSX, useState } from 'react';
import { Label } from '@/components/ui/Label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { CheckIcon } from '@/components/icons';

interface CurrencyFieldProps extends Omit<SelectProps, 'onValueChange'> {
  options: Array<{ value: string; label: string }>;
  label?: string;
  placeholder?: string;
  value?: string;
  onValueChange: (val: string) => void;
  className?: string;
}

export const CurrencySelect = ({
  options,
  label,
  value,
  placeholder,
  onValueChange,
  className = '',
}: CurrencyFieldProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <>
      {label && <Label className="block text-base text-white">{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'w-[118px] h-12 bg-[#ffffff] rounded-[4px] px-3 flex items-center justify-between cursor-pointer border border-[#111113]',
              'text-[#111113]',
              !selected && 'text-[#010101]',
              className
            )}
          >
            <span>{selected?.label || placeholder}</span>
            <CheckIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent className="z-50 bg-white border-none text-form-field text-base roundred-sm p-3 w-[118px]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onValueChange(option.value);
                setOpen(false);
              }}
              className={cn(
                'w-full text-left px-2 py-1 rounded-sm',
                'hover:bg-text-gray',
                option.value === value && 'bg-text-gray'
              )}
            >
              {option.label}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
};
