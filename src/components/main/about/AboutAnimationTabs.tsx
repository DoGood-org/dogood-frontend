'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components';
import { AboutTabsProps } from '@/types';
import { CaretDoubleRight } from '@/components/icons';

export const AboutAnimationTabs = ({
  views,
  activeView,
  onChange,
}: AboutTabsProps): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ left: number; width: number } | null>(
    null
  );
  const [startIndex, setStartIndex] = useState(0);

  const buttonWidthRef = useRef<number>(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const activeBtn = container.querySelector(
      `[data-view="${activeView}"]`
    ) as HTMLElement;

    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });

      const btnRect = activeBtn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const left = btnRect.left - containerRect.left + container.scrollLeft;
      const width = btnRect.width;
      setRect({ left, width });
    }
  }, [activeView]);

  useLayoutEffect(() => {
    // Зберігаємо ширину кнопки для розрахунку скролу
    if (containerRef.current) {
      const firstBtn = containerRef.current.querySelector(
        'button'
      ) as HTMLElement;
      if (firstBtn) {
        buttonWidthRef.current = firstBtn.offsetWidth + 8; // 8 = gap-2
      }
    }
  }, []);

  const handleArrowClick = (): void => {
    if (!containerRef.current) return;
    const newIndex = (startIndex + 3) % views.length;
    setStartIndex(newIndex);

    const scrollX = newIndex * buttonWidthRef.current;
    containerRef.current.scrollTo({
      left: scrollX,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative mb-[25px]">
      <div
        ref={containerRef}
        className="relative flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none]
               [&::-webkit-scrollbar]:hidden whitespace-nowrap scroll-smooth md:justify-center"
      >
        {rect && (
          <motion.div
            layout
            className="absolute top-0 left-0 h-full rounded-md border-2 border-primary pointer-events-none"
            initial={false}
            animate={{ left: rect.left, width: rect.width }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}

        {views.map(({ view }, index) => (
          <Button
            variant="ghost"
            size="sm"
            key={`${index}-${view}`}
            data-view={view}
            onClick={() => onChange(view)}
            className={`relative z-10 text-p2-d px-4 py-2 rounded-md transition-color duration-800 ${
              activeView === view ? 'text-primary' : 'text-muted'
            }`}
          >
            {view}
          </Button>
        ))}
      </div>

      {/* Стрілка справа */}
      <button
        onClick={handleArrowClick}
        className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 bg-transparent p-2 z-20"
      >
        <CaretDoubleRight />
      </button>
    </div>
  );
};
