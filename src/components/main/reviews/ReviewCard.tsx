import { cn } from '@/lib/utils';
import { ReviewCardProps } from '@/types';
import { JSX } from 'react';

export const ReviewCard = ({
  review,
  className = '',
  index,
}: ReviewCardProps): JSX.Element => {
  return (
    <div
      className={cn(
        'rounded-lg p-[32px] shadow-[0px_4px_4px_0px_#00000040] ',
        index % 2
          ? 'bg-review-bg text-white'
          : 'bg-background text-foreground border border-border-hover',
        className
      )}
    >
      <p className="text-base">{review.review}</p>
      <p className="mt-[10px] font-semibold text-base">{review.author}</p>
    </div>
  );
};
