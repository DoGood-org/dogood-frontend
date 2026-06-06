'use client';

import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { DonationFormValues } from '@/types/donationType';
import { Input } from '@/components/ui/Input';

const inputClassName =
  'h-12 rounded-lg bg-white text-[#0D0D0D] border border-[#111113] p-3 focus-within:ring-1 focus-within:ring-[#00c1ac] focus-within:border-transparent';

export const DonationPersonalInfoSection = (): JSX.Element => {
  const t = useTranslations('card');
  const {
    register,
    formState: { errors },
  } = useFormContext<DonationFormValues>();

  return (
    <div className="space-y-4">
      <h3 className="text-base">{t('yourInformation')}</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm">
            {t('firstName')}
            <span className="text-red-500">*</span>
          </label>
          <Input
            {...register('firstName')}
            placeholder={t('firstName')}
            className={inputClassName}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">
            {t('lastName')}
            <span className="text-red-500">*</span>
          </label>
          <Input
            {...register('lastName')}
            placeholder={t('lastName')}
            className={inputClassName}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">
            {t('email')}
            <span className="text-red-500">*</span>
          </label>
          <Input
            {...register('email')}
            type="email"
            placeholder={t('email')}
            className={inputClassName}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">{t('postCode')}</label>
          <Input
            {...register('postCode')}
            placeholder={t('postCode')}
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">{t('country')}</label>
          <Input
            {...register('country')}
            placeholder={t('country')}
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">{t('streetAddress')}</label>
          <Input
            {...register('streetAddress')}
            placeholder={t('streetAddress')}
            className={inputClassName}
          />
        </div>
      </div>

      <p className="text-xs ">{t('requiredNote')}</p>
    </div>
  );
};
