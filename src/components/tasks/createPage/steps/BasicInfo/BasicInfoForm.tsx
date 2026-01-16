'use client';

import { Input } from '@/components/ui/Input';
import { JSX } from 'react';
import { DatePicker } from './DatePicker';
import { Label } from '@/components/ui/Label';
import { Controller, useForm } from 'react-hook-form';
import { TimePicker } from './TimePicker';

type BasicInfoFormValues = {
  title?: string;
  location?: string;
  startDate?: Date;
  finishDate?: Date;
  time?: string;
};

export const formInputClasses =
  'bg-white h-[48px] text-base text-black placeholder-black ' +
  'py-3 px-2 rounded-sm border-2 border-field ' +
  'focus-visible:ring-0 focus-visible:ring-offset-0';

export const BasicInfoForm = (): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useForm<BasicInfoFormValues>({
    defaultValues: {
      title: '',
      location: '',
      startDate: undefined,
      finishDate: undefined,
      time: '',
    },
    mode: 'onChange',
  });
  return (
    <form className="flex flex-col gap-2 mb-9 lg:mb-12">
      <div>
        <Label
          htmlFor="title"
          className="mb-2
          text-text-help
          dark:text-gray"
        >
          Title
        </Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="Title"
              aria-label="Title"
              className={formInputClasses}
            />
          )}
        />
      </div>

      <div>
        <Label
          htmlFor="location"
          className="mb-2
          text-text-help
          dark:text-gray"
        >
          Location
        </Label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="Location"
              aria-label="Location"
              className={formInputClasses}
            />
          )}
        />
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <Label
            htmlFor="startDate"
            className="mb-2 block text-sm font-medium
            text-text-help dark:text-gray"
          >
            Date from
          </Label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder="16-05-2025"
              />
            )}
          />
          {errors.startDate && (
            <p className="text-sm font-medium text-error mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div className="flex-1">
          <Label
            htmlFor="finishDate"
            className="mb-2 block text-sm font-medium 
            text-text-help dark:text-gray"
          >
            Date to
          </Label>
          <Controller
            name="finishDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder="16-06-2025"
              />
            )}
          />
          {errors.finishDate && (
            <p className="text-sm font-medium text-error mt-1">
              {errors.finishDate.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label
          htmlFor="time"
          className="mb-2 block text-sm font-medium
          text-text-help dark:text-gray"
        >
          Time
        </Label>

        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <TimePicker
              value={field.value ?? ''}
              setValue={field.onChange}
              placeholder="Time"
            />
          )}
        />

        {errors.time && (
          <p className="text-sm font-medium text-error mt-1">
            {errors.time.message}
          </p>
        )}
      </div>
    </form>
  );
};
