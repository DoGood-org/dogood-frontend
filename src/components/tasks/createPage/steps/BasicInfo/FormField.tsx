'use client';

import { JSX } from 'react';
import {
  Controller,
  useFormContext,
  FieldValues,
  Path,
  ControllerRenderProps,
} from 'react-hook-form';
import { Label } from '@/components/ui/Label';

interface FormFieldProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  label: string;
  required?: boolean;
  children: (
    field: ControllerRenderProps<TFormValues, Path<TFormValues>>
  ) => JSX.Element;
}

export const FormField = <TFormValues extends FieldValues>({
  name,
  label,
  children,
  required = false,
}: FormFieldProps<TFormValues>): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const error = errors[name]?.message as string | undefined;
  const starClass = error ? 'text-error' : 'text-text-help dark:text-gray';

  return (
    <div className="mb-2">
      <Label
        htmlFor={name}
        className="mb-2 block text-text-help dark:text-gray"
      >
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
