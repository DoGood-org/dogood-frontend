'use client';

import { useSwipe } from '@/hooks';
import { cn } from '@/lib/utils';
import { useState, JSX, useRef } from 'react';
import { Pagination } from './Pagination';

type SliderProps<T> = {
  items: T[];
  itemsPerSlide?: number;
  renderItem: (item: T, index: number) => JSX.Element;
  listClassName?: string;
  itemClassName?: string;
  containerClassName?: string;
  sliderClassName?: string;
  buttonsClassName?: string;
  showPagination?: boolean;
};

export const Slider = <T,>({
  items,
  itemsPerSlide = 2,
  renderItem,
  listClassName = '',
  itemClassName = '',
  containerClassName = '',
  sliderClassName = '',
  buttonsClassName = '',
  showPagination = true,
}: SliderProps<T>): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalPages = Math.ceil(items.length / itemsPerSlide);
  const containerRef = useRef<HTMLDivElement>(null);

  // ➤ Swipe integration
  useSwipe({
    ref: containerRef,
    onSwipeLeft: () => {
      if (currentSlide < totalPages - 1) {
        setCurrentSlide((prev) => prev + 1);
      }
    },
    onSwipeRight: () => {
      if (currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    },
    isEnabled: true,
  });

  const grouped = Array.from(
    { length: Math.ceil(items.length / itemsPerSlide) },
    (_, i) => items.slice(i * itemsPerSlide, i * itemsPerSlide + itemsPerSlide)
  );

  // const prevSlide = (): void => {
  //   setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  // };

  // const nextSlide = (): void => {
  //   setCurrentSlide((prev) => (prev < grouped.length - 1 ? prev + 1 : prev));
  // };

  return (
    <div className={cn('w-full mx-auto', containerClassName)}>
      <div
        ref={containerRef}
        className={cn('overflow-hidden', sliderClassName)}
      >
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {grouped.map((group, slideIdx) => (
            <ul
              key={slideIdx}
              className={cn('min-w-full flex flex-col', listClassName)}
            >
              {group.map((item, itemIdx) => (
                <li key={itemIdx} className={cn('p-2', itemClassName)}>
                  {renderItem(item, itemIdx)}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {showPagination && (
        <Pagination
          currentPage={currentSlide}
          totalPages={grouped.length}
          onPageChange={setCurrentSlide}
          className={buttonsClassName}
        />
      )}
    </div>
  );
};
