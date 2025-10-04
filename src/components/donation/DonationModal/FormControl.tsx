'use client';

import { Input } from '@/components';
import { Label } from '@/components';
import { JSX } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface FormControlProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
  placeholder?: string;
  className?: string;
  type?: string;
  width?: 'full' | 'default';
}

export const FormControl = ({
  label,
  name,
  register,
  errors,
  placeholder,
  className = '',
  type = 'text',
  width = 'default',
}: FormControlProps): JSX.Element => {
  const inputWidth = width === 'full' ? 'w-full' : 'w-full';

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-base">
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`${inputWidth} ${className}`}
      />
      {errors && <p className="text-base">{errors.message}</p>}
    </div>
  );
};
