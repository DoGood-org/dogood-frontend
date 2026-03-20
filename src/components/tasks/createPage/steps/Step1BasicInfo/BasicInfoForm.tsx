'use client';

import { JSX } from 'react';
import { DatePicker } from '@/components/tasks/createPage/Form/DatePicker';
import { TimePicker } from '@/components/tasks/createPage/Form/TimePicker';
import { FormField } from '@/components/tasks/createPage/Form/FormField';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormInput } from '@/components/tasks/createPage/Form/FormInput';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';
import { LocationSearchInput } from '@/components/tasks/createPage/Form/LocationAutocomplete';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

export const BasicInfoForm = (): JSX.Element => {
  const t = useTranslations('tasks.createTask.form');

  const { control, setValue } = useFormContext<BasicInfoFormValues>();
  const startDate = useWatch({
    control,
    name: 'startDate',
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex flex-col gap-2 mb-9 lg:mb-12">
      <FormInput
        name="title"
        label={t('title')}
        placeholder={t('title')}
        required
      />

      <LocationSearchInput
        name="locationName"
        label={t('location')}
        onSelect={(location) => {
          setValue('locationName', location.address, {
            shouldValidate: true,
          });

          if (
            typeof location.lat === 'number' &&
            typeof location.lng === 'number'
          ) {
            setValue(
              'location',
              { lat: location.lat, lng: location.lng },
              {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              }
            );
          }
        }}
      />
      <div className="flex flex-col gap-2 md:gap-6 md:flex-row">
        <FormField name="startDate" label={t('dateFrom')} required>
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
        <FormField name="endDate" label={t('dateTo')} required>
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
        <FormField name="startTime" label={t('startTime')} required>
          {(field) => (
            <TimePicker
              value={field.value ?? ''}
              setValue={field.onChange}
              onBlur={field.onBlur}
              placeholder={t('startTime')}
            />
          )}
        </FormField>
      </div>
    </div>
  );
};
