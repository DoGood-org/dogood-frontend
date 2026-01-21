'use client';

import { JSX } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { FormField } from './FormField';
import { Input } from '@/components/ui/Input';

const formInputClasses =
  'bg-white h-[48px] text-base text-black placeholder-black ' +
  'py-3 px-2 rounded-sm border-2 border-[#999999] ' +
  'focus-visible:ring-0 focus-visible:ring-offset-0 w-full';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

export const FormInput = <T extends FieldValues>({
  name,
  label,
  required,
  placeholder,
  type = 'text',
}: FormInputProps<T>): JSX.Element => (
  <FormField name={name} label={label} required={required}>
    {(field) => (
      <Input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        className={formInputClasses}
      />
    )}
  </FormField>
);
