'use client';

import { motion } from 'framer-motion';
import { CloseIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { JSX, MouseEvent } from 'react';

interface ModalCloseButtonProps {
  onClick: () => void;
  className?: string;
  iconClassName?: string;
  isUpperModal?: boolean;
}

export const ModalCloseButton = ({
  onClick,
  className = '',
  iconClassName = '',
  isUpperModal = false,
}: ModalCloseButtonProps): JSX.Element => {
  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    onClick();
  };

  return (
    <motion.button
      className={cn(
        'absolute cursor-pointer text_tag hover:text-[#696969] z-10',
        className,
        isUpperModal && 'upper-modal'
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseDown={handleMouseDown}
      aria-label="Close modal"
      type="button"
    >
      <CloseIcon className={cn('w-6 h-6', iconClassName)} />
    </motion.button>
  );
};
