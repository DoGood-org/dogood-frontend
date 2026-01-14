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

export const BasicInfoForm = (): JSX.Element => {
  const {
    control,
    // register,
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
        text-[#696969]
        dark:text-[#999999]"
        >
          Title
        </Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              onChange={field.onChange}
              type="text"
              placeholder="Title"
              aria-label="Title"
              className="bg-white text-base text-black placeholder-black py-3 px-2 rounded-sm border-2
              border-[#999999] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          )}
        />
      </div>

      <div>
        <Label
          htmlFor="location"
          className="mb-2
        text-[#696969]
        dark:text-[#999999]"
        >
          Location
        </Label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              onChange={field.onChange}
              type="text"
              placeholder="Location"
              aria-label="Location"
              className="bg-white text-base text-black placeholder-black py-3 px-2
              rounded-sm border-2 border-[#999999] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          )}
        />
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <Label className="mb-2 block text-sm font-medium text-[#696969] dark:text-[#999999]">
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
          <Label className="mb-2 block text-sm font-medium text-[#696969] dark:text-[#999999]">
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
        <Label className="mb-2 block text-sm font-medium text-[#696969] dark:text-[#999999]">
          Time
        </Label>

        <Controller
          name="time"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TimePicker
              value={field.value}
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
