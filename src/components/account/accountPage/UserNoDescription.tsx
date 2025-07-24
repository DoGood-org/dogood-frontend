import { LinkWithArrow } from '@/components/ui/LinkWithArrow';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

export const UserNoDescription = (): JSX.Element => {
  const t = useTranslations('account');

  return (
    <>
      <p className="mt-6 text-base">{t('noDescription')}</p>
      <LinkWithArrow href="" text={t('noDescriptionButton')} className="mt-5" />
    </>
  );
};
