'use client';

import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { DonationFormValues } from '@/types/donationType';

export const CommunityConsent = (): JSX.Element => {
  const t = useTranslations('donate');
  const { register } = useFormContext<DonationFormValues>();

  const checkboxClass =
    'mt-0.5 h-5 w-5 shrink-0 rounded border-2 border-[#2C8C8C] accent-[#2C8C8C] cursor-pointer';

  return (
    <div className="space-y-3 mt-15">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          {...register('hideNamePublicly')}
          className={checkboxClass}
        />
        <span className="text-sm">
          {t('communityConsent.hideNamePublicly')}
        </span>
      </label>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          {...register('emailUpdates')}
          className={checkboxClass}
        />
        <span className="text-sm">
          {t('communityConsent.marketingUpdates')}
        </span>
      </label>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          {...register('textMessages')}
          className={checkboxClass}
        />
        <span className="text-sm">
          {t('communityConsent.contactByNonprofit')}
        </span>
      </label>
    </div>
  );
};
