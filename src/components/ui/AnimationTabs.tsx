'use client';

import React, { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AboutTabsProps } from '@/types';
import {
  useIconComponents,
  useMediaQuery,
  useScrollToActive,
  useSwipe,
} from '@/hooks';
import { CarouselItem, getVisibleItems } from '@/lib/carouselUtils';
import { CaretDoubleRight } from '@/components/icons';
import { useRouteMatch } from '@/hooks/useRouteMatch';
import { Button } from './Button';

export const AnimationTabs = ({
  views,
  activeView,
  onChange,
  isScroll = false,
  buttonClass = '',
  refClass = '',
  headClass = '',
}: AboutTabsProps): React.JSX.Element => {
  const isTabletOrLarger = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const carouselItems: CarouselItem[] = views.map((viewObj) => ({
    view: viewObj.view,
    icon: viewObj.icon,
  }));

  const activeIndex = carouselItems.findIndex(
    (item) => item.view === activeView
  );

  const isOrganizationPage = useRouteMatch('organization');

  const icons = useIconComponents();

  const visibleItems =
    isScroll && !isTabletOrLarger
      ? getVisibleItems(carouselItems, activeIndex)
      : carouselItems;

  const containerRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ left: number; width: number } | null>(
    null
  );

  const handleNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % carouselItems.length;
    onChange(carouselItems[nextIndex].view);
  }, [activeIndex, carouselItems, onChange]);

  // Only activate swipe tracking if scroll mode is enabled
  useSwipe({
    ref: containerRef,
    onSwipeLeft: handleNext,
    isEnabled: isScroll && !isTabletOrLarger,
  });

  useScrollToActive({
    containerRef,
    activeView,
    isTabletOrLarger,
    setRect,
  });

  return (
    <div
      className={`relative flex items-center md:justify-center ${headClass}`}
    >
      <div
        ref={containerRef}
        className={`
          relative flex gap-2 md:justify-center 
          ${refClass}
          ${isScroll && !isTabletOrLarger ? 'overflow-x-auto scroll-smooth whitespace-nowrap' : ''}
          ${isScroll && !isTabletOrLarger ? '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : ''}
        `}
      >
        {rect && (
          <motion.div
            layout
            className="absolute top-0 left-0 h-full rounded-md border-1 border-border pointer-events-none z-0"
            initial={false}
            animate={{ left: rect.left, width: rect.width }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}

        {visibleItems.map(({ view, icon }, index) => (
          <Button
            variant="ghost"
            size="sm"
            key={`${index}-${view}`}
            data-view={view}
            onClick={() => onChange(view)}
            className={`relative z-10 text-p2-d px-4 py-2 rounded-md transition-color text-foreground duration-500 ${buttonClass} 
            `}
          >
            {!isDesktop && isOrganizationPage
              ? icons[icon as keyof typeof icons]
              : view}
          </Button>
        ))}
      </div>

      {isScroll && !isTabletOrLarger && (
        <button
          onClick={handleNext}
          className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 bg-background z-20 cursor-pointer"
        >
          <CaretDoubleRight className="size-8" />
        </button>
      )}
    </div>
  );
};
