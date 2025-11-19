import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { EmptyContent } from '@/components';

export const OrgMoreSection = ({ info }: { info?: string }): JSX.Element => {
  const t = useTranslations('organization');

  return (
    <>
      <h2 className="text-h2-m lg:text-h2">{t('more.title')}</h2>

      {!info ? (
        <EmptyContent>{t('noInfo')}</EmptyContent>
      ) : (
        // TODO ----------------
        <p className="whitespace-pre-line">{info}</p>
        // ----------------------
      )}
    </>
  );
};
