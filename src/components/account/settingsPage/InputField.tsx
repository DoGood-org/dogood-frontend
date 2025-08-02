'use client';

import { Input } from '@/components';
import { Label } from '@/components';
import { JSX } from 'react';
import { FieldError } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  name: string;
  register: any;
  errors?: FieldError;
  placeholder?: string;
  className?: string;
  type?: string;
  width?: 'full' | 'default';
}

export const InputField = ({
  label,
  name,
  register,
  errors,
  placeholder,
  className = '',
  type = 'text',
  width = 'default',
}: InputFieldProps): JSX.Element => {
  const inputWidth = width === 'full' ? 'w-full' : 'w-full md:w-[477px]';

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-white text-base">
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`${inputWidth} bg-white border-none text-form-field ${className}`}
      />
      {errors && (
        <p className="text-sm font-medium text-error mt-1">{errors.message}</p>
      )}
    </div>
  );
};
