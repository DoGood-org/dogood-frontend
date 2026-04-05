import React from 'react';
import { Rating } from '../ui/Rating';
import { IReview } from '@/types/grantsType';

export const ReviewItem = ({
  review,
}: {
  review: IReview;
}): React.JSX.Element => {
  return (
    <div className="bg-card rounded-2xl p-4 md:w-75 lg:w-95">
      <h3 className="text-base lg:text-md">
        {review.comment.match(/^.*?(:\)|\.|!|\?)/)?.[0] || review.comment}
      </h3>
      <Rating rating={review.rating} />
      <p className="text-sm lg:text-base mb-4 leading-6">
        {review.comment.replace(/^.*?(:\)|\.|!|\?)/, '').trim()}
      </p>
      <p className="text-sm">{review.author.name}</p>
    </div>
  );
};
