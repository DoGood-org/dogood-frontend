'use client';

import { ChevronLeft, ChevronRight } from '@/components/icons';
import { useSwipe } from '@/hooks';
import { useState, JSX, useRef } from 'react';

type SliderProps<T> = {
  items: T[];
  itemsPerSlide?: number;
  renderItem: (item: T, index: number) => JSX.Element;
};

export const Slider = <T,>({
  items,
  itemsPerSlide = 2,
  renderItem,
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

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev < grouped.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="w-full mx-auto">
      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {grouped.map((group, slideIdx) => (
            <ul key={slideIdx} className="min-w-full flex flex-col">
              {group.map((item, itemIdx) => (
                <li key={itemIdx} className="p-2">
                  {renderItem(item, itemIdx)}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {grouped.length > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          {/* LEFT ARROW */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`transition p-1 ${
              currentSlide === 0
                ? 'opacity-30 cursor-auto'
                : 'hover:scale-110 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* PAGINATION DOTS */}
          <div className="flex items-center gap-[18px]">
            {grouped.map((_, idx) => (
              <button
                key={idx}
                className="p-[7px]"
                onClick={() => setCurrentSlide(idx)}
              >
                <span
                  className={`w-[10px] h-[10px] block rounded-full border border-foreground transition cursor-pointer ${
                    currentSlide === idx ? 'bg-foreground' : 'border-foreground'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={nextSlide}
            disabled={currentSlide === grouped.length - 1}
            className={`transition p-1  ${
              currentSlide === grouped.length - 1
                ? 'opacity-30 cursor-auto'
                : 'hover:scale-110 cursor-pointer'
            }`}
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      )}
    </div>
  );
};
