'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import React, { JSX, ReactNode } from 'react';

interface DraggableDrawerProps {
  mapHeight: number;
  minHeight?: number | undefined;
  children: ReactNode;
  className?: string;
  onExpand?: () => void;
  onCollapse?: () => void;
}

export const DraggableDrawer = ({
  mapHeight,
  minHeight = 80,
  children,
  className = '',
  onExpand,
  onCollapse,
}: DraggableDrawerProps): JSX.Element => {
  const maxHeight = mapHeight;
  const collapsedOffset = maxHeight - minHeight;

  const y = useMotionValue(collapsedOffset);
  const height = useTransform(y, (val) =>
    Math.max(minHeight, Math.min(maxHeight, maxHeight - val))
  );

  const dragConstraints = {
    top: -collapsedOffset,
    bottom: 0,
  };

  return (
    <motion.div
      className={`bg-card w-full rounded-t-xl overflow-hidden ${className}`}
      style={{ height }}
      drag="y"
      dragConstraints={dragConstraints}
      dragElastic={0.2}
      dragMomentum={false}
      onDragEnd={(e, info) => {
        const offset = info.offset.y;
        const velocity = info.velocity.y;

        if (offset > 80 || velocity > 800) {
          y.set(collapsedOffset);
          onCollapse?.();
        } else if (offset < -80 || velocity < -800) {
          y.set(0);
          onExpand?.();
        }
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="h-6 flex items-center justify-center cursor-grab">
        <div className="w-10 h-1.5 bg-muted rounded-full" />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
};
