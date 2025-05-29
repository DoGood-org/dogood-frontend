'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';

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
    const activeBtn = container.querySelector<HTMLButtonElement>(
      `[data-view="${activeView}"]`
    );
    if (activeBtn) {
      const { left, width } = activeBtn.getBoundingClientRect();
      const containerLeft = container.getBoundingClientRect().left;
      setRect({ left: left - containerLeft, width });
    }
  }, [activeView]);

  return (
    <div
      className="relative inline-flex gap-[46px] mb-[25px]"
      ref={containerRef}
    >
      {/* Animated border */}
      {rect && (
        <motion.div
          layout
          className="absolute top-0 left-0 h-full rounded-md border-2 border-primary pointer-events-none"
          initial={false}
          animate={{
            x: rect.left,
            width: rect.width,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}

      {/* Buttons */}
      {views.map(({ view }) => (
        <Button
          variant="ghost"
          key={view}
          data-view={view}
          onClick={() => onChange(view)}
          className={`relative z-10 transition-colors ${
            activeView === view ? 'text-primary' : 'text-muted'
          }`}
        >
          {view}
        </Button>
      ))}
    </div>
  );
};
