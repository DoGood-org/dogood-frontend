import { JSX } from 'react';
import { ReviewProps } from '@/types';
import { ReviewItem, Slider } from '@/components';
import { useTranslations } from 'next-intl';
import { mockUser } from '@/data/mockUser';

export const ReviewsList = (): JSX.Element => {
  const reviews = mockUser.reviewsReceived as ReviewProps[];
  const t = useTranslations('account');

  return (
    <>
      {reviews.length > 0 ? (
        <Slider
          items={reviews}
          itemsPerSlide={3}
          renderItem={(review, idx) => (
            <ReviewItem key={`${idx}-${review.id}`} review={review} />
          )}
        />
      ) : (
        <p className="m-auto">{t('noReview')}</p>
      )}
    </>
  );
};
