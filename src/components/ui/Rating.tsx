// 'use client';

// import { Star } from '@/components/icons';
// import { cn } from '@/lib/utils';
// import { RatingProps } from '@/types';
// import {
//   ForwardedRef,
//   forwardRef,
//   JSX,
//   KeyboardEvent,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';

// export const RatingComponent = forwardRef(
//   (
//     {
//       isEditable = false,
//       rating,
//       tabIndex,
//       setRating,
//       error,
//       ...props
//     }: RatingProps,
//     ref: ForwardedRef<HTMLUListElement>
//   ): JSX.Element => {
//     const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
//       new Array(5).fill(<></>)
//     );
//     const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

//     useEffect(() => {
//       constructRating(rating);
//     }, [rating, tabIndex]);

//     const computeFocus = (rat: number, index: number): number => {
//       if (!isEditable) return -1;
//       if (!rating && index === 0) return tabIndex ?? 0;
//       if (rat === index + 1) return tabIndex ?? 0;
//       return -1;
//     };

//     const constructRating = (currentRating: number): void => {
//       const updatedArray = ratingArray.map((_, index: number) => (
//         <span
//           key={index}
//           className={cn(
//             'p-2 block',
//             index < currentRating
//               ? 'fill-star stroke-star text-star'
//               : 'fill-none stroke-black text-black',
//             isEditable && 'cursor-pointer',
//             error && 'stroke-error'
//           )}
//           onMouseEnter={() => changeDisplay(index + 1)}
//           onMouseLeave={() => changeDisplay(rating)}
//           onClick={() => onClick(index + 1)}
//           tabIndex={computeFocus(rating, index)}
//           onKeyDown={handleKey}
//           ref={(el) => {
//             ratingArrayRef.current[index] = el;
//           }}
//           role={isEditable ? 'slider' : ''}
//           aria-invalid={!!error}
//           aria-valuenow={rating}
//           aria-valuemin={1}
//           aria-valuemax={5}
//           // aria-label={isEditable ? 'Specify rating' : `Rating ${rating}`}
//         >
//           <Star className="size-7" />
//         </span>
//       ));
//       setRatingArray(updatedArray);
//     };

//     const changeDisplay = (index: number): void => {
//       if (!isEditable) return;
//       constructRating(index);
//     };

//     const onClick = (index: number): void => {
//       if (!isEditable || !setRating) return;
//       setRating(index);
//     };

//     const handleKey = (e: KeyboardEvent): void => {
//       if (!isEditable || !setRating) return;

//       if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
//         e.preventDefault();
//         setRating(rating < 5 ? rating + 1 : 5);
//         ratingArrayRef.current[rating]?.focus();
//       }
//       if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
//         e.preventDefault();
//         setRating(rating > 1 ? rating - 1 : 1);
//         ratingArrayRef.current[rating - 2]?.focus();
//       }
//     };

//     return (
//       <ul {...props} ref={ref} className={cn('flex', error && 'text-error')}>
//         {ratingArray.map((rating, index) => (
//           <li key={index}>{rating}</li>
//         ))}
//         {error && (
//           <span
//             role="alert"
//             className="absolute left-0 -bottom-5 text-error text-sm"
//           >
//             {error.message}
//           </span>
//         )}
//       </ul>
//     );
//   }
// );

// RatingComponent.displayName = 'Rating';

// export const Rating = RatingComponent;

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
// import { StarItem } from './StarItem';

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

    // const changeDisplay = (index: number): void => {
    //   // purely visual, no state update
    // };

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
              // isFilled={index < rating}
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
