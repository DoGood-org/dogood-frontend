import { JSX } from 'react';
import { ReviewsList, Section } from '@/components';
import { useTranslations } from 'next-intl';
import { ReviewListProps } from '@/types';

export const UserReviewSection = ({
  reviews,
}: ReviewListProps): JSX.Element => {
  const t = useTranslations('account');

  return (
    <Section>
      <h2 className="text-h2 mb-6">{t('reviewSectionTitle')}</h2>
      <ReviewsList reviews={reviews} />
    </Section>
  );
};
