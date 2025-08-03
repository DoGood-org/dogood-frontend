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

interface SelectFieldProps extends SelectProps {
  options: Array<{ value: string; label: string }>;
  label?: string;
  placeholder?: string;
}

export const SelectField = ({
  options,
  label,
  placeholder,
  ...props
}: SelectFieldProps): React.JSX.Element => {
  return (
    <div className="space-y-1">
      {label && (
        <Label className="block text-base text-white mb-2">{label}</Label>
      )}
      <Select {...props}>
        <SelectTrigger className="w-full md:w-[477px] bg-white border-none text-form-field">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white border-none text-form-field text-base py-3 pl-2">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
