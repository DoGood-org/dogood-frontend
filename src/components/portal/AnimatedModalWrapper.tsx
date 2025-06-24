'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { JSX, useEffect } from 'react';

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
  useEffect((): (() => void) => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('modal-backdrop')) {
        onClose();
      }
    };

    if (isVisible) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isVisible, onClose]);

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
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
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
