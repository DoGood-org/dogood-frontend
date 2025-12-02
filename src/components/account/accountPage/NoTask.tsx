import { LinkWithArrow } from '@/components/ui/LinkWithArrow';
import { useRouteMatch } from '@/hooks/useRouteMatch';
import { useLocale, useTranslations } from 'next-intl';
import { JSX } from 'react';

export const NoTask = (): JSX.Element => {
  const t = useTranslations('account');
  const locale = useLocale();
  const isAccountPage = useRouteMatch('/account');

  return (
    <>
      <div className="bg-card m-auto p-8 text-center rounded-lg w-full">
        <p className="text-base lg:text-h3">{t('noTaskPublic')}</p>
      </div>
      {isAccountPage && (
        <div className="m-auto">
          <LinkWithArrow
            href={`/${locale}/account/map`}
            text={t('task.button')}
          />
        </div>
      )}
    </>
  );
};
