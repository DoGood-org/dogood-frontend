'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { JSX, ReactNode } from 'react';

type AnimatedDrawlerProps = {
  isVisible: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  duration?: number;
  offset?: number;
  direction?: 'vertical' | 'horizontal';
  exeptionForClickOutside?: boolean;
  exeptionSelector?: string;
  height?: number;
};

export const AnimatedDrawler = ({
  isVisible,
  children,
  className = '',
  duration = 0.4,
  offset = 40,
  direction = 'vertical',
}: AnimatedDrawlerProps): JSX.Element => {
  const axis = direction === 'horizontal' ? { x: offset } : { y: offset };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          style={{ willChange: 'transform' }}
          initial={{ opacity: 0, ...axis }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, ...axis }}
          transition={{ duration, ease: 'easeOut' }}
          className={`animated-drawer ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
