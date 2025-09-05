import { LinkWithArrow } from '@/components';
import { useRouteMatch } from '@/hooks/useRouteMatch';
import { useLocale, useTranslations } from 'next-intl';
import { JSX } from 'react';

export const NoTask = (): JSX.Element => {
  const t = useTranslations('account');
  const locale = useLocale();
  const isAccountPage = useRouteMatch('/account');
  const isPublicProfilePage = useRouteMatch('/profile');

  return (
    <>
      {isAccountPage && (
        <div className="m-auto flex flex-col gap-4 items-center max-w-[538px] mt-20">
          <h3 className="text-h3">{t('task.title')}</h3>
          <p className="text-base">{t('task.text')}</p>
          <LinkWithArrow
            href={`/${locale}/account/map`}
            text={t('task.button')}
          />
        </div>
      )}
      {isPublicProfilePage && (
        <div className="bg-card m-auto p-6 text-center rounded-lg">
          <p>{t('noTaskPublic')}</p>
        </div>
      )}
    </>
  );
};
