'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { JSX, ReactNode } from 'react';

type AnimatedDrawlerProps = {
  isVisible: boolean;
  children: ReactNode;
  className?: string;
  duration?: number;
  offset?: number;
  direction?: 'vertical' | 'horizontal';
};

export const AnimatedDrawler = ({
  isVisible,
  children,
  className = '',
  duration = 0.3,
  offset = 40,
  direction = 'vertical',
}: AnimatedDrawlerProps): JSX.Element => {
  const axis = direction === 'horizontal' ? { x: offset } : { y: offset };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, ...axis }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, ...axis }}
          transition={{ duration, ease: 'easeOut' }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
