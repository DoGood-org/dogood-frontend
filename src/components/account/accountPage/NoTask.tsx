import { LinkWithArrow } from '@/components';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

export const NoTask = (): JSX.Element => {
  const t = useTranslations('account');
  const { setCurrentPage } = navigationStore();

  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setCurrentPage('Map');
  };

  return (
    <div className="m-auto flex flex-col gap-4 items-center max-w-[538px] mt-20">
      <h3 className="text-h3">{t('task.title')}</h3>
      <p className="text-base">{t('task.text')}</p>
      <LinkWithArrow href="" onClick={handleOnClick} text={t('task.button')} />
    </div>
  );
};
