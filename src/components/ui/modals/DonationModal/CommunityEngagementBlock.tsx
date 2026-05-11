'use client';

import { JSX } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useFormContext } from 'react-hook-form';
import { DonationFormValues } from '@/types/donationType';

type ChoiceButtonProps = {
  active: boolean;
  onClick: () => void;
  label: string;
};

const ChoiceButton = ({
  active,
  onClick,
  label,
}: ChoiceButtonProps): JSX.Element => {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="ghost"
      size="default"
      className={cn(
        'h-12 min-w-21 rounded border border-[#00c1ac] px-7 text-white transition-colors hover:border-[#00c1ac] hover:text-white',
        active ? 'bg-[#00c1ac1a]' : 'hover:bg-[#00c1ac14]'
      )}
    >
      {label}
    </Button>
  );
};

export const CommunityEngagementBlock = (): JSX.Element => {
  const t = useTranslations('donate');
  const locale = useLocale();
  const { watch, setValue } = useFormContext<DonationFormValues>();

  const emailChoice = Boolean(watch('communityEmailUpdates'));
  const smsChoice = Boolean(watch('communityTextMessages'));

  return (
    <section className="space-y-2">
      <div className="space-y-3">
        <h3 className="text-white text-xl ">{t('communityPrompt.title')}</h3>
        <p className=" text-sm  text-[#ffffff99]">
          {t('communityPrompt.description')}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-white text-base  leading-11">
          {t('communityPrompt.emailQuestion')}
        </p>
        <div className="flex gap-4">
          <ChoiceButton
            active={emailChoice}
            onClick={() =>
              setValue('communityEmailUpdates', true, {
                shouldDirty: true,
                shouldTouch: true,
              })
            }
            label={t('communityPrompt.yes')}
          />
          <ChoiceButton
            active={!emailChoice}
            onClick={() =>
              setValue('communityEmailUpdates', false, {
                shouldDirty: true,
                shouldTouch: true,
              })
            }
            label={t('communityPrompt.no')}
          />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-white text-base leading-11">
          {t('communityPrompt.smsQuestion')}
        </p>
        <div className="flex gap-4">
          <ChoiceButton
            active={smsChoice}
            onClick={() =>
              setValue('communityTextMessages', true, {
                shouldDirty: true,
                shouldTouch: true,
              })
            }
            label={t('communityPrompt.yes')}
          />
          <ChoiceButton
            active={!smsChoice}
            onClick={() =>
              setValue('communityTextMessages', false, {
                shouldDirty: true,
                shouldTouch: true,
              })
            }
            label={t('communityPrompt.no')}
          />
        </div>
      </div>

      <p className=" text-sm pt-5 text-[#ffffff99]">
        {t('communityPrompt.privacyPrefix')}{' '}
        <Link
          href={`/${locale}/privacy`}
          className="text-[#00c1ac] hover:underline"
        >
          {t('communityPrompt.privacyLink')}
        </Link>{' '}
        {t('communityPrompt.privacySuffix')}
      </p>
    </section>
  );
};
