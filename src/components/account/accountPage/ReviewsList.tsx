import { JSX } from 'react';
import { ReviewListProps } from '@/types';
import { NoReviews, ReviewItem, Slider } from '@/components';

export const ReviewsList = ({ reviews }: ReviewListProps): JSX.Element => {
  if (!reviews || reviews.length === 0) {
    return <NoReviews />;
  }

  return (
    <Slider
      items={reviews}
      itemsPerSlide={3}
      renderItem={(review, idx) => (
        <ReviewItem key={`${idx}-${review.id}`} review={review} />
      )}
    />
  );
};
