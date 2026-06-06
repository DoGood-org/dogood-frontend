'use client';

import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { DonationFormValues, DonationType } from '@/types/donationType';
import { Button } from '@/components/ui/Button';

const donateTargets: { value: DonationType; labelKey: string }[] = [
  { value: 'USER', labelKey: 'donateTarget.user' },
  { value: 'ORGANIZATION', labelKey: 'donateTarget.organization' },
  { value: 'PROJECT', labelKey: 'donateTarget.project' },
  { value: 'LINE', labelKey: 'donateTarget.line' },
];

export const DonateTarget = (): JSX.Element => {
  const t = useTranslations('donate');
  const { watch, setValue } = useFormContext<DonationFormValues>();

  const selected = watch('donationType');

  return (
    <div className="mb-12 space-y-4">
      <h3 className="text-base">{t('donateTarget.title')}</h3>

      <div className="flex flex-wrap gap-3">
        {donateTargets.map(({ value, labelKey }) => (
          <Button
            key={value}
            type="button"
            variant="secondary"
            onClick={() =>
              setValue('donationType', value, { shouldValidate: true })
            }
            className={cn(
              'h-12 rounded-[6px] border border-[#2C8C8C] text-md transition-colors',
              selected === value ? 'bg-[#2C8C8C] text-white' : 'bg-transparent'
            )}
          >
            {t(labelKey)}
          </Button>
        ))}
      </div>
    </div>
  );
};
