'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { JSX, ReactNode } from 'react';

type AnimatedPanelProps = {
  isVisible: boolean;
  children: ReactNode;
  className?: string;
  duration?: number;
  offsetY?: number;
};

export const AnimatedPanel = ({
  isVisible,
  children,
  className = '',
  duration = 0.3,
  offsetY = 20,
}: AnimatedPanelProps): JSX.Element => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: offsetY }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: offsetY }}
          transition={{ duration, ease: 'easeOut' }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
