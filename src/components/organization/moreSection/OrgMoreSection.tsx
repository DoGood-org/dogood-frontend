import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { EmptyContent } from '../EmptyContent';

export const OrgMoreSection = ({ info }: { info?: string }): JSX.Element => {
  const t = useTranslations('organization');

  return (
    <>
      <h2 className="text-h2-m lg:text-h2">{t('more.title')}</h2>

      {!info ? (
        <EmptyContent>{t('noInfo')}</EmptyContent>
      ) : (
        // ---------change this code ------
        <p className="whitespace-pre-line">{info}</p>
        // ----------------------
      )}
    </>
  );
};
