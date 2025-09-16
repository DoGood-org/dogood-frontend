import { useTranslations } from 'next-intl';
import { JSX } from 'react';

export const NoReviews = (): JSX.Element => {
  const t = useTranslations('account');

  return (
    <div className="bg-card m-auto p-6 text-center rounded-lg">
      <p className="text-h3">{t('noReviewPublic')}</p>
    </div>
  );
};
