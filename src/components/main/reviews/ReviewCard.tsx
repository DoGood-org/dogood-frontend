import { ReviewCardProps } from '@/types';
import { JSX } from 'react';

export const ReviewCard = ({
  review,
  className = '',
  index,
}: ReviewCardProps): JSX.Element => {
  return (
    <div
      className={`rounded-lg p-[32px] shadow-[0px_4px_4px_0px_#00000040] 
                    ${index % 2 ? 'bg-text-help text-white md:bg-review-reverse md:text-foreground lg:bg-text-help lg:text-white' : 'bg-background text-foreground md:bg-review-bg md:text-white lg:bg-black lg:text-white'} 
                    ${className}
                    `}
    >
      <p className="text-base">{review.review}</p>
      <p className="mt-[10px] font-semibold text-base">{review.author}</p>
    </div>
  );
};
