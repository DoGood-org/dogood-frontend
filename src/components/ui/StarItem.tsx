'use client';

import { Star } from '@/components/icons';
import { cn } from '@/lib/utils';
import { forwardRef, ForwardedRef, JSX } from 'react';
import { StarItemProps } from '@/types';

export const StarItem = forwardRef(
  (
    {
      index,
      isFilled,
      isEditable,
      error,
      changeDisplay,
      resetDisplay,
      onClick,
      handleKey,
      computeFocus,
    }: StarItemProps,
    ref: ForwardedRef<HTMLSpanElement>
  ): JSX.Element => {
    return (
      <span
        className={cn(
          'p-2 block',
          isFilled
            ? 'fill-star stroke-star text-star'
            : 'fill-none stroke-black text-black',
          isEditable && 'cursor-pointer',
          error && 'stroke-error'
        )}
        onMouseEnter={() => changeDisplay(index + 1)}
        onMouseLeave={() => resetDisplay()}
        onClick={() => onClick(index + 1)}
        tabIndex={computeFocus(index + 1, index)}
        onKeyDown={handleKey}
        ref={ref}
        role={isEditable ? 'slider' : undefined}
        aria-invalid={!!error}
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={5}
      >
        <Star className="size-7" />
      </span>
    );
  }
);

StarItem.displayName = 'StarItem';
