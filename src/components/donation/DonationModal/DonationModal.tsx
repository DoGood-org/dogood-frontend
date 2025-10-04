'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from '@/components/ui/portal/Portal';
import { CloseIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useClickOutside } from '@/hooks/useClickOutside';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  wrapperClassName?: string; // Для додаткової гнучкості
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  children,
  wrapperClassName = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 1. Блокування прокрутки
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return (): void => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // 2. Закриття по кліку поза та Esc
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
      {/* 3. Анімація відкриття/закриття */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // Бекдроп
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Контейнер модального вікна */}
            <motion.div
              ref={modalRef}
              className={cn(
                'relative w-full max-w-[354px] md:max-w-[574px] lg:max-w-[994px] rounded-xl bg-white p-5 md:p-9 shadow-2xl',
                wrapperClassName
              )}
              // Анімація контейнера для ефекту 'стрибка'
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ duration: 0.3 }}
              // Зупиняємо спливання кліку, щоб не закрити модалку
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закриття (Close/X) */}
              <motion.button
                className="absolute top-4 right-4 cursor-pointer text_tag hover:text-[#696969] z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Close modal"
                type="button"
              >
                <CloseIcon className="w-6 h-6" />
              </motion.button>

              {/* Вміст */}
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};
