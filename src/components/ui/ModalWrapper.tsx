'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from '@/components/ui/portal/Portal';
import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  wrapperClassName?: string;
  backdropClassName?: string;
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
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return (): void => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useClickOutside({
    ref: modalRef,
    callback: onClose,
    options: {
      enabled: isOpen,
      detectEscapeKey: true,
    },
  });

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              'fixed inset-0 z-50 flex items-center justify-center',
              backdropClassName
            )}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <motion.div
              ref={modalRef}
              className={cn(
                'relative w-full rounded-xl bg-[#fffcfc] dark:bg-[#303030] shadow-2xl',
                wrapperClassName
              )}
              variants={modalVariants}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};
