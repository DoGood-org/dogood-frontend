'use client';

import { Input } from '@/components';
import { JSX } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface FormControlProps {
  name: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
  placeholder?: string;
  className?: string;
  type?: string;
}

export const FormControl = ({
  name,
  register,
  errors,
  placeholder,
  type = 'text',
  className = '',
}: FormControlProps): JSX.Element => {
  return (
    <div className="flex justify-center">
      <Input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`
          w-full
          lg:max-w-[500px]
          py-3
          px-4
          bg-white 
          border-modal
          text-base
          placeholder-text-help
          rounded-sm 
          outline-none
          focus:outline-none
          focus:ring-2
          focus: text-[#00c1ac]
          focus:border-transparent
          appearance-none
          shadow-none
          ${className}
        `}
      />
      {errors && (
        <p className="text-base font-medium text-error mt-1">
          {errors.message}
        </p>
      )}
    </div>
  );
};
