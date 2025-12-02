import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { ReviewListProps } from '@/types';
import { Section } from '@/components/ui/Section';
import { ReviewsList } from '@/components/account/accountPage/ReviewsList';

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
