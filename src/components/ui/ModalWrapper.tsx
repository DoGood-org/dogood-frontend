'use client';

import { ReactNode, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from '@/components/ui/portal/Portal';
import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';
import { useModalFocusAndScroll } from '@/hooks/useModalFocusAndScroll';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  wrapperClassName?: string;
  backdropClassName?: string;
  ignoreSelectors?: string[];
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 30, scale: 0.95 },
};

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  children,
  wrapperClassName = '',
  backdropClassName = 'bg-black/50 backdrop-blur-sm',
  ignoreSelectors = [],
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useModalFocusAndScroll(modalRef, isOpen);

  useClickOutside({
    ref: modalRef,
    callback: onClose,
    options: {
      enabled: isOpen,
      detectEscapeKey: true,
      ignoreSelectors,
    },
  });

  const isUpperModal = wrapperClassName.includes('upper-modal');

  const backdropMarker = isUpperModal ? 'upper-modal' : '';

  return (
    <Portal>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={cn(
              backdropMarker,
              'fixed inset-0 z-50 flex items-center justify-center p-4',
              backdropClassName
            )}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="presentation"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              className={cn(
                'relative w-full rounded-xl bg-[#fffcfc] dark:bg-[#303030] shadow-2xl outline-none',
                wrapperClassName
              )}
              variants={modalVariants}
              role="dialog"
              aria-modal="true"
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};
