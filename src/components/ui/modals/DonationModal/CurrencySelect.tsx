'use client';

import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { cn } from '@/lib/utils';
import { SelectProps } from '@radix-ui/react-select';
import { JSX } from 'react';

interface CurrencyFieldProps extends Omit<SelectProps, 'onValueChange'> {
  options: Array<{ value: string; label: string }>;
  label?: string;
  placeholder?: string;
  onValueChange: (val: string) => void;
  className?: string;
}

export const CurrencySelect = ({
  options,
  label,
  placeholder,
  onValueChange,
  className = '',
  ...props
}: CurrencyFieldProps): JSX.Element => {
  return (
    <>
      {label && <Label className="block text-base text-white">{label}</Label>}

      <Select onValueChange={onValueChange} {...props}>
        <SelectTrigger
          className={cn(
            'text-[#111113] placeholder-[#010101]',
            'w-[118px] h-12 bg-[#ffffff] rounded-[4px] relative flex items-center px-3 border border-[#111113] shadow-none outline-none',
            '[&[data-size=default]]:h-12',
            'border border-[#111113] shadow-none outline-none',
            'data-[state=open]:border-[#00c1ac]',
            'focus-visible:ring-1 focus-visible:ring-[#00c1ac] focus-visible:border-[#00c1ac]',
            'focus-visible:ring-offset-0',
            'focus-within:ring-offset-0',

            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white border-none text-form-field text-base roundrer-sm p-3">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="hover:bg-text-gray"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
