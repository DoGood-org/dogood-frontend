import { ReviewProps } from '@/types';
import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { EmptyContent, ReviewItem } from '@/components';
import { Role } from '@/lib/getUserRole';

export const OrgReviewSection = ({
  reviews,
  role,
}: {
  reviews?: ReviewProps[];
  role: Role;
}): JSX.Element => {
  const t = useTranslations('organization');

  const title =
    role === 'ADMIN' || role === 'MODERATOR'
      ? `${t('reviews.title')}`
      : `${t('reviews.userTitle')}`;

  return (
    <>
      <h2 className="text-h2-m lg:text-h2">{title}</h2>

      {!reviews || !reviews.length ? (
        <EmptyContent>{t('noReview')}</EmptyContent>
      ) : (
        // ---------change this code ------
        <ul className="flex flex-col gap-4">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
        // ----------------------
      )}
    </>
  );
};
