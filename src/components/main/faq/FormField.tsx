'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/Input';
import type { FormData } from './formSchema';
import { VALIDATION_ERRORS } from '@/constants/formValidation';
import { FormFieldConfig, ValidationMessages } from '@/types/contact';

type ValidationErrorKey =
  (typeof VALIDATION_ERRORS)[keyof typeof VALIDATION_ERRORS];

export const FormField = ({
  name,
  label,
  type = 'text',
  placeholder,
  maxLength = 200,
  rows = 4,
  className,
  required = false,
}: FormFieldConfig): React.ReactElement => {
  const t = useTranslations('faq');
  const { validation } = (
    t.raw('contact') as {
      validation: ValidationMessages;
    }[]
  )[0];
  const { control } = useFormContext<FormData>();

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
        render={({ field, fieldState }) => {
          const error = fieldState.error?.message as
            | ValidationErrorKey
            | undefined;

          const errorId = `${name}-error`;

          return (
            <>
              {type === 'textarea' ? (
                <div className="relative">
                  <textarea
                    id={name}
                    {...field}
                    placeholder={placeholder}
                    rows={rows}
                    maxLength={maxLength}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
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
                  aria-invalid={!!error}
                  aria-describedby={error ? errorId : undefined}
                  className={cn(
                    'placeholder:italic w-full pl-2 pr-4 py-[15px] text-p4-m md:py-[21px] md:text-p2-d bg-[#ffffff] text-[#303030] placeholder-[#999999] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#17814b] border border-[#696969]',
                    className
                  )}
                />
              )}

              {error && (
                <span
                  id={errorId}
                  role="alert"
                  className="absolute left-2 -bottom-5 text-red-500 text-sm"
                >
                  {validation[error]}
                </span>
              )}
            </>
          );
        }}
      />
    </div>
  );
};
