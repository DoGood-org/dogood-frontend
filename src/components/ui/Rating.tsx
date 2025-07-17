'use client';

import { cn } from '@/lib/utils';
import { RatingProps } from '@/types';
import {
  ForwardedRef,
  forwardRef,
  JSX,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { StarItem } from './StarItem';

export const RatingComponent = forwardRef(
  (
    {
      isEditable = false,
      rating,
      tabIndex,
      setRating,
      error,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLUListElement>
  ): JSX.Element => {
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    const [displayRating, setDisplayRating] = useState(rating);

    useEffect(() => {
      setDisplayRating(rating);
    }, [rating]);

    const changeDisplay = (index: number): void => {
      if (!isEditable) return;
      setDisplayRating(index);
    };

    const resetDisplay = (): void => {
      if (!isEditable) return;
      setDisplayRating(rating);
    };

    const computeFocus = (rat: number, index: number): number => {
      if (!isEditable) return -1;
      if (!rating && index === 0) return tabIndex ?? 0;
      if (rat === index + 1) return tabIndex ?? 0;
      return -1;
    };

    const onClick = (index: number): void => {
      if (!isEditable || !setRating) return;
      setRating(index);
    };

    const handleKey = (e: KeyboardEvent): void => {
      if (!isEditable || !setRating) return;

      if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
        e.preventDefault();
        setRating(rating < 5 ? rating + 1 : 5);
        ratingArrayRef.current[rating]?.focus();
      }
      if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    return (
      <ul {...props} ref={ref} className={cn('flex', error && 'text-error')}>
        {Array.from({ length: 5 }, (_, index) => (
          <li key={index}>
            <StarItem
              index={index}
              isFilled={index < displayRating}
              isEditable={isEditable}
              error={error}
              changeDisplay={changeDisplay}
              resetDisplay={resetDisplay}
              onClick={onClick}
              handleKey={handleKey}
              computeFocus={computeFocus}
              ref={(el) => {
                ratingArrayRef.current[index] = el;
              }}
            />
          </li>
        ))}
        {error && (
          <span
            role="alert"
            className="absolute left-0 -bottom-5 text-error text-sm"
          >
            {error.message}
          </span>
        )}
      </ul>
    );
  }
);

RatingComponent.displayName = 'Rating';

export const Rating = RatingComponent;
