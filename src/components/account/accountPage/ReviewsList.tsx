import { JSX } from 'react';
import userData from './user.json';
import { ReviewItem } from './ReviewItem';
import { ReviewProps } from '@/types';

export const ReviewsList = (): JSX.Element => {
  const reviews = userData.reviewsReceived as ReviewProps[];

  return (
    <ul className="">
      {reviews.map((review, idx) => (
        <li key={idx} className="p-2">
          <ReviewItem review={review} />
        </li>
      ))}
    </ul>
  );
};
