'use client';

import { useClickOutside } from '@/hooks/useClickOutside';
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
};

export const AnimatedDrawler = ({
  isVisible,
  onClose,
  children,
  className = '',
  duration = 0.3,
  offset = 40,
  direction = 'vertical',
}: AnimatedDrawlerProps): JSX.Element => {
  const axis = direction === 'horizontal' ? { x: offset } : { y: offset };
  const ref = React.useRef<HTMLDivElement | null>(null);

  useClickOutside({
    ref: ref,
    callback: onClose ?? ((): void => {}),
    options: {
      enabled: isVisible,
      detectEscapeKey: true,
    },
  });

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          ref={ref}
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
