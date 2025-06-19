'use client';

import React, { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AboutTabsProps } from '@/types';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSwipe } from '@/hooks/useSwipe';
import { useScrollToActive } from '@/hooks/useScrollToActive';
import { CarouselItem, getVisibleItems } from '@/lib/carouselUtils';
import { Button } from '@/components';
import { CaretDoubleRight } from '@/components/icons';

export const AboutAnimationTabs = ({
  views,
  activeView,
  onChange,
}: AboutTabsProps): React.JSX.Element => {
  const isTabletOrLarger = useMediaQuery('(min-width: 768px)');

  const carouselItems: CarouselItem[] = views.map((viewObj) => viewObj.view);
  const activeIndex = carouselItems.findIndex((item) => item === activeView);

  const visibleItems = isTabletOrLarger
    ? carouselItems
    : getVisibleItems(carouselItems, activeIndex);

  const containerRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ left: number; width: number } | null>(
    null
  );

  const handleNext = useCallback(() => {
    const nextIndex = (activeIndex + 3) % carouselItems.length;
    onChange(carouselItems[nextIndex]);
  }, [activeIndex, carouselItems, onChange]);

  useSwipe({
    ref: containerRef,
    onSwipeLeft: handleNext,
    // onSwipeRight: handlePrev (якщо реалізується)
  });
  useScrollToActive({ containerRef, activeView, isTabletOrLarger, setRect });

  return (
    <div className="relative flex items-center md:justify-center">
      <div
        ref={containerRef}
        className="relative flex gap-2 md:justify-center overflow-x-auto md:overflow-x-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden whitespace-nowrap scroll-smooth "
      >
        {rect && (
          <motion.div
            layout
            className="absolute top-0 left-0 h-full rounded-md border-1 border-border pointer-events-none"
            initial={false}
            animate={{ left: rect.left, width: rect.width }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        {visibleItems.map((view, index) => (
          <Button
            variant="ghost"
            size="sm"
            key={`${index}-${view}`}
            data-view={view}
            onClick={() => onChange(view)}
            className={`relative z-10 text-p2-d px-4 py-2 rounded-md transition-color duration-500 ${
              activeView === view ? 'text-primary' : 'text-muted'
            }`}
          >
            {view}
          </Button>
        ))}
      </div>
      {!isTabletOrLarger && (
        <button
          onClick={handleNext}
          className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 bg-transparent z-20 cursor-pointer"
        >
          <CaretDoubleRight className="size-8" />
        </button>
      )}
    </div>
  );
};
