'use client';

import { useLocale, useTranslations } from 'next-intl';
import { JSX } from 'react';
import { useRouteMatch } from '@/hooks/useRouteMatch';
import { LinkWithArrow } from '@/components/ui/LinkWithArrow';

export const UserNoDescription = (): JSX.Element => {
  const t = useTranslations('account');
  const locale = useLocale();
  const isAccountPage = useRouteMatch('/account');
  const isPublicProfilePage = useRouteMatch('/profile');

  return (
    <>
      {isAccountPage && (
        <>
          <p className="mt-6 text-base">{t('noDescription')}</p>
          <LinkWithArrow
            href={`/${locale}/account/settings`}
            text={t('noDescriptionButton')}
            className="mt-5"
          />
        </>
      )}

      {isPublicProfilePage && (
        <>
          <h3 className="mt-6 text-base">{t('description')}:</h3>
          <p className="mt-6 text-base font-semibold">
            {t('noDescriptionPublic')}
          </p>
        </>
      )}
    </>
  );
};
