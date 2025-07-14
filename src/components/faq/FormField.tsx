'use client';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Input } from '../ui/Input';
type Props = {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  className?: string;
  required?: boolean;
};

export const FormField = ({
  name,
  label,
  type = 'text',
  placeholder,
  maxLength = 200,
  rows = 4,
  className,
  required,
}: Props): React.ReactElement => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="relative mb-6">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-[#696969] mb-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? 'This field is required' : false,
          pattern:
            type === 'email'
              ? {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                }
              : type === 'tel'
                ? {
                    value: /^[0-9+\-()\s]+$/,
                    message: 'Invalid phone number',
                  }
                : undefined,
        }}
        render={({ field }) =>
          type === 'textarea' ? (
            <div className="relative">
              <textarea
                id={name}
                {...field}
                placeholder={placeholder}
                rows={rows}
                maxLength={maxLength}
                className={cn(
                  'placeholder:italic w-full h-[122px] pl-2 pr-4 py-[15px] text-p4-m md:py-[21px] md:text-p2-d bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#17814b] border border-[#696969]',
                  className
                )}
              />
              <div className="absolute bottom-2 right-4 text-xs text-[#999999]">
                {field.value?.length || 0}/{maxLength}
              </div>
            </div>
          ) : (
            <Input
              id={name}
              {...field}
              type={type}
              placeholder={placeholder}
              className={cn(
                'placeholder:italic w-full pl-2 pr-4 py-[15px] text-p4-m md:py-[21px] md:text-p2-d bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#17814b] border border-[#696969]',
                className
              )}
            />
          )
        }
      />

      {error && (
        <span className="absolute left-2 -bottom-5 text-red-500 text-sm">
          {error}
        </span>
      )}
    </div>
  );
};
