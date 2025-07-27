import { LinkWithArrow } from '@/components';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

export const UserNoDescription = (): JSX.Element => {
  const t = useTranslations('account');
  const { setCurrentPage } = navigationStore();

  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setCurrentPage('Settings');
  };

  return (
    <>
      <p className="mt-6 text-base">{t('noDescription')}</p>
      <LinkWithArrow
        href=""
        onClick={handleOnClick}
        text={t('noDescriptionButton')}
        className="mt-5"
      />
    </>
  );
};
