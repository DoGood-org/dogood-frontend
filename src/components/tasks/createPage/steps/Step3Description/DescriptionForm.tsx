'use client';

import { JSX } from 'react';
import { FormInputTextarea } from '@/components/tasks/createPage/Form/FormInputTextarea';
import { useTranslations } from 'next-intl';

export const DescriptionForm = (): JSX.Element => {
  const t = useTranslations('tasks.createTask.form');

  return (
    <div className="flex flex-col gap-4 mb-[144px] w-[329px] md:w-[432px] lg:w-[421px]">
      <FormInputTextarea
        name="description"
        label={t('descriptionLabel')}
        required
        placeholder={t('descriptionPlaceholder')}
      />

      <FormInputTextarea
        name="requirements"
        label={t('requirementsLabel')}
        required={false}
        placeholder={t('requirementsPlaceholder')}
      />
    </div>
  );
};
