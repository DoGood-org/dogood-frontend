'use client';

import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
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
          className={`w-[118px] bg-[#ffffff] rounded-sm relative flex items-center px-3 pt-[22.6px] pb-[24px] border-modal focus-within:ring-1 focus-within:ring-[#00c1ac]
        ${className}`}
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
