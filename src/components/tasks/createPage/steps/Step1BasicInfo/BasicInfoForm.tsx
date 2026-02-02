'use client';

import { JSX } from 'react';
import { DatePicker } from '../../Form/DatePicker';
import { TimePicker } from '../../Form/TimePicker';
import { FormField } from '../../Form/FormField';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '../../Form/FormInput';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';

export const BasicInfoForm = (): JSX.Element => {
  const { getValues } = useFormContext<BasicInfoFormValues>();
  return (
    <form className="flex flex-col gap-2 mb-9 lg:mb-12 md:px-[60px] lg:px-0">
      <FormInput name="title" label="Title" placeholder="Title" required />

      <FormInput
        name="location"
        label="Location"
        placeholder="Location"
        required
      />
      <div className="flex flex-col gap-2 md:gap-6 md:flex-row">
        <FormField name="startDate" label="Date from" required>
          {(field) => (
            <DatePicker
              value={field.value ?? undefined}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="16-05-2025"
              disabledDate={(date) => date > new Date()}
            />
          )}
        </FormField>
        <FormField name="finishDate" label="Date to" required>
          {(field) => (
            <DatePicker
              value={field.value ?? undefined}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="16-06-2025"
              disabledDate={(date) => {
                const startDate = getValues('startDate');
                return startDate ? date < startDate : false;
              }}
            />
          )}
        </FormField>
      </div>
      <div className="md:w-[198px]">
        <FormField name="time" label="Time" required>
          {(field) => (
            <TimePicker
              value={field.value ?? ''}
              setValue={field.onChange}
              onBlur={field.onBlur}
              placeholder="Time"
            />
          )}
        </FormField>
      </div>
    </form>
  );
};
