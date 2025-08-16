'use client';
import { useClickOutside } from '@/hooks/useClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import { JSX, useEffect, useRef } from 'react';
import Portal from '@/components/ui/portal/Portal';
import Back from '@/components/icons/Back';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  wrapperClassName?: string;
  buttonClassName?: string;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  wrapperClassName = '',
  buttonClassName = '',
}: ModalProps): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('settings');

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
        <motion.div
          className="modal-backdrop bg-text-gray/70 fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            ref={modalRef}
            className={cn(
              'bg-map-btn p-6 max-w-[500px] rounded-lg w-full relative',
              wrapperClassName
            )}
          >
            <button
              onClick={onClose}
              className={cn(
                'text-current flex items-center pr-2 cursor-pointer group absolute t-6 r-6',
                buttonClassName
              )}
              aria-label="Back"
              type="button"
            >
              <Back className="w-5 h-5 text-bg-icon mr-2 group-hover:text-btn-hover group-active:text-btn-active" />
              <span className="text-base text-foreground group-hover:text-btn-hover group-active:text-btn-active">
                {t('payment.back')}
              </span>
            </button>
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </Portal>
  );
};
