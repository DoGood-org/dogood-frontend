'use client';

import { Input } from '@/components/ui/Input';
import { JSX } from 'react';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import { FormField } from './FormField';
import { useFormContext } from 'react-hook-form';
import { BasicInfoFormValues } from '@/types/createTask.type';

export const formInputClasses =
  'bg-white h-[48px] text-base text-black placeholder-black ' +
  'py-3 px-2 rounded-sm border-2 border-[#999999] ' +
  'focus-visible:ring-0 focus-visible:ring-offset-0';

export const BasicInfoForm = (): JSX.Element => {
  const { getValues } = useFormContext<BasicInfoFormValues>();
  return (
    <form className="flex flex-col gap-2 mb-9 lg:mb-12">
      <FormField name="title" label="Title" required>
        {(field) => (
          <Input
            {...field}
            id={field.name}
            type="text"
            placeholder="Title"
            className={formInputClasses}
          />
        )}
      </FormField>
      <FormField name="location" label="Location" required>
        {(field) => (
          <Input
            {...field}
            id={field.name}
            type="text"
            placeholder="Location"
            aria-label="Location"
            className={formInputClasses}
          />
        )}
      </FormField>
      <div className="flex flex-col gap-6 md:flex-row">
        <FormField name="startDate" label="Date from" required>
          {(field) => (
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              placeholder="16-05-2025"
              disabledDate={(date) => date > new Date()}
            />
          )}
        </FormField>
        <FormField name="finishDate" label="Date to" required>
          {(field) => (
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              placeholder="16-06-2025"
              disabledDate={(date) => {
                const startDate = getValues('startDate');
                return startDate ? date < startDate : false;
              }}
            />
          )}
        </FormField>
      </div>
      <FormField name="time" label="Time" required>
        {(field) => (
          <TimePicker
            value={field.value ?? ''}
            setValue={field.onChange}
            placeholder="Time"
          />
        )}
      </FormField>
    </form>
  );
};
