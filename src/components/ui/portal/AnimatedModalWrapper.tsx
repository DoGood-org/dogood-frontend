'use client';
import { useClickOutside } from '@/hooks/useClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import { JSX, useRef } from 'react';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  position?: 'fixed' | 'absolute';
};
export const AnimatedModalWrapper: React.FC<Props> = ({
  isVisible,
  onClose,
  children,
  position = 'fixed',
}): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: modalRef,
    callback: onClose,
    options: {
      enabled: isVisible,
      detectEscapeKey: true,
    },
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`modal-backdrop ${position} inset-0 z-[1100] flex items-center justify-center`}
          initial={{ opacity: 0, backdropFilter: 'blur(2px)' }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            ref={modalRef}
            className="modal-content"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
