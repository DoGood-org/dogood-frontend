'use client';

import { IReview } from '@/types/globalReviews';
import React from 'react';
import { ReviewItem } from './ReviewItem';

interface ReviewsListProps {
  reviews: IReview[];
}

export const ReviewsList = ({
  reviews,
}: ReviewsListProps): React.JSX.Element => {
  return (
    <ul className="flex flex-col gap-8 md:block md:columns-2 md:gap-5 lg:columns-3 lg:gap-6">
      {reviews.map((review) => (
        <li key={review.id} className="w-full md:break-inside-avoid md:mb-4">
          <ReviewItem review={review} />
        </li>
      ))}
    </ul>
  );
};
