import { JSX } from 'react';
import { ReviewListProps } from '@/types';
import { Slider } from '@/components/ui/Slider';
import { NoReviews } from '@/components/account/accountPage/NoReviews';
import { ReviewItem } from '@/components/account/accountPage/ReviewItem';

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
