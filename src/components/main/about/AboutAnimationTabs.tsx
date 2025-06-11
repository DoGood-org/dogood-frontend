'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components';

export const AboutAnimationTabs = ({
  views,
  activeView,
  onChange,
}: {
  views: { view: string }[];
  activeView: string;
  onChange: (view: string) => void;
}): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ left: number; width: number } | null>(
    null
  );

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const activeBtn = container.querySelector(
      `[data-view="${activeView}"]`
    ) as HTMLElement;
    if (activeBtn) {
      // Прокрутка до активної кнопки
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });

      // Обчислення обводки
      const btnRect = activeBtn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const left = btnRect.left - containerRect.left + container.scrollLeft;
      const width = btnRect.width;
      setRect({ left, width });
    }
  }, [activeView]);

  return (
    <div
      ref={containerRef}
      className="relative flex gap-4 mb-[25px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none]
             [&::-webkit-scrollbar]:hidden whitespace-nowrap scroll-smooth md:justify-start"
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
          className={`relative z-10 px-4 py-2 rounded-md transition-color duration-800 ${
            activeView === view ? 'text-primary' : 'text-muted'
          }`}
        >
          {view}
        </Button>
      ))}
    </div>
  );
};
