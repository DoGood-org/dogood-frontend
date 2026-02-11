'use client';

import { JSX } from 'react';
import { DatePicker } from '../../Form/DatePicker';
import { TimePicker } from '../../Form/TimePicker';
import { FormField } from '../../Form/FormField';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormInput } from '../../Form/FormInput';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';
import { LocationSearchInput } from '../../Form/LocationAutocomplete';
import { format } from 'date-fns';

export const BasicInfoForm = (): JSX.Element => {
  const { control, setValue } = useFormContext<BasicInfoFormValues>();
  const startDate = useWatch({
    control,
    name: 'startDate',
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex flex-col gap-2 mb-9 lg:mb-12">
      <FormInput name="title" label="Title" placeholder="Title" required />

      <LocationSearchInput
        name="locationName"
        label="Location"
        onSelect={(location) => {
          setValue('locationName', location.address, { shouldValidate: true });
        }}
      />
      <div className="flex flex-col gap-2 md:gap-6 md:flex-row">
        <FormField name="startDate" label="Date from" required>
          {(field) => (
            <DatePicker
              value={field.value ?? undefined}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={format(new Date(), 'dd-MM-yyyy')}
              disabledDate={(date) => date < today}
            />
          )}
        </FormField>
        <FormField name="endDate" label="Date to" required>
          {(field) => (
            <DatePicker
              value={field.value ?? undefined}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={format(new Date(), 'dd-MM-yyyy')}
              disabledDate={(date) =>
                date < (startDate ? new Date(startDate) : today)
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
