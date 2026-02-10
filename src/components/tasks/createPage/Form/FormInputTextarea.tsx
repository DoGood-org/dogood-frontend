'use client';

import { FieldValues } from 'react-hook-form';
import { FormField } from './FormField';
import { FormInputProps } from './FormInput';
import { Textarea } from '@/components/ui/Textarea';
import { JSX } from 'react';

export const FormInputTextarea = <T extends FieldValues>({
  name,
  label,
  required,
  placeholder,
}: FormInputProps<T>): JSX.Element => (
  <FormField name={name} label={label} required={required}>
    {(field) => (
      <Textarea
        {...field}
        value={field.value ?? ''}
        id={name}
        maxLength={500}
        placeholder={placeholder}
        className="
        resize-none min-h-12 bg-white text-base text-black placeholder-black
        py-2 px-2 rounded-sm border-2 border-[#999999] 
        focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    )}
  </FormField>
);
