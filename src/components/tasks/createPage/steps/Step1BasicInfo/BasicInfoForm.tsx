'use client';

import { JSX } from 'react';
import { DatePicker } from '../../Form/DatePicker';
import { TimePicker } from '../../Form/TimePicker';
import { FormField } from '../../Form/FormField';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormInput } from '../../Form/FormInput';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';
import { LocationSearchInput } from '../../Form/LocationAutocomplete';

export const BasicInfoForm = (): JSX.Element => {
  const { control } = useFormContext<BasicInfoFormValues>();
  const startDate = useWatch({
    control,
    name: 'startDate',
  });

  return (
    <div className="flex flex-col gap-2 mb-9 lg:mb-12">
      <FormInput name="title" label="Title" placeholder="Title" required />

      <LocationSearchInput
        name="locationName"
        label="Location"
        onSelect={(location) => {
          console.log('Вибрана локація:', location);
        }}
      />
      <div className="flex flex-col gap-2 md:gap-6 md:flex-row">
        <FormField name="startDate" label="Date from" required>
          {(field) => (
            <DatePicker
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="16-05-2025"
              disabledDate={(date) => date > new Date()}
            />
          )}
        </FormField>
        <FormField name="endDate" label="Date to" required>
          {(field) => (
            <DatePicker
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="16-06-2025"
              disabledDate={(date) =>
                startDate ? date < new Date(startDate) : date < new Date()
              }
            />
          )}
        </FormField>
      </div>
      <div className="md:w-[198px]">
        <FormField name="startTime" label="Start time" required>
          {(field) => (
            <TimePicker
              value={field.value ?? ''}
              setValue={field.onChange}
              onBlur={field.onBlur}
              placeholder="Start time"
            />
          )}
        </FormField>
      </div>
    </div>
  );
};
