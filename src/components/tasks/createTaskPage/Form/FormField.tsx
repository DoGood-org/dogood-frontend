'use client';

import { JSX } from 'react';
import {
  Controller,
  useFormContext,
  Path,
  ControllerRenderProps,
  get,
  FieldValues,
} from 'react-hook-form';
import { Label } from '@/components/ui/Label';

interface FormFieldProps<T extends FieldValues, TFieldName extends Path<T>> {
  name: TFieldName;
  label: string;
  required?: boolean;
  children: (field: ControllerRenderProps<T, TFieldName>) => JSX.Element;
}

export const FormField = <T extends FieldValues, TFieldName extends Path<T>>({
  name,
  label,
  children,
  required = false,
}: FormFieldProps<T, TFieldName>): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

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
        control={control}
        render={({ field }) => children(field)}
      />
      {error && <p className="text-sm font-medium text-error mt-1">{error}</p>}
    </div>
  );
};
