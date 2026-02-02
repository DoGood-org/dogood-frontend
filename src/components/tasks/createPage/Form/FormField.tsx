'use client';

import { JSX } from 'react';
import {
  Controller,
  useFormContext,
  Path,
  ControllerRenderProps,
  get,
} from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';

interface FormFieldProps<TName extends Path<BasicInfoFormValues>> {
  name: TName;
  label: string;
  required?: boolean;
  children: (
    field: ControllerRenderProps<BasicInfoFormValues, TName>
  ) => JSX.Element;
}

export const FormField = <TName extends Path<BasicInfoFormValues>>({
  name,
  label,
  children,
  required = false,
}: FormFieldProps<TName>): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<BasicInfoFormValues>();

  const error = get(errors, name)?.message;

  const labelClass = error
    ? 'mb-2 block text-error'
    : 'mb-2 block text-text-help dark:text-gray';
  const starClass = error ? 'text-error' : 'text-text-help dark:text-gray';

  return (
    <div className="mb-2">
      <Label htmlFor={name} className={labelClass}>
        {label}
        {required && <span className={`ml-1 ${starClass}`}>*</span>}
      </Label>
      <Controller
        name={name}
        rules={{ required }}
        control={control}
        render={({ field }) => children(field)}
      />
      {error && <p className="text-sm font-medium text-error mt-1">{error}</p>}
    </div>
  );
};
