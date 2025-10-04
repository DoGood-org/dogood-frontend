import { useTranslations } from 'next-intl';
import { JSX } from 'react';

export const NoOrganizations = (): JSX.Element => {
  const t = useTranslations('account');

  return (
    <div className="bg-card m-auto p-8 text-center rounded-lg">
      <p className="text-base lg:text-h3">{t('noOrganizationionPublic')}</p>
    </div>
  );
};
