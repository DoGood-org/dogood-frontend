'use client';
import { useClickOutside } from '@/hooks/useClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import { JSX, useRef } from 'react';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};
export const AnimatedModalWrapper: React.FC<Props> = ({
  isVisible,
  onClose,
  children,
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
          className="modal-backdrop fixed inset-0 z-[1000] flex items-center justify-center"
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
