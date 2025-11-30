'use client';

import { ModalWrapper } from '@/components';
import { FinishTaskModalContent } from '@/components/tasks/FinishTaskModal/FinishTaskModalContent';
import { motion } from 'framer-motion';
import { JSX } from 'react';
import { cn } from '@/lib/utils';
import { CloseIcon } from '@/components/icons';

interface FinishTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  wrapperClassName?: string;
}

export const FinishTaskModal = ({
  isOpen,
  onClose,
  onConfirm,
  wrapperClassName = '',
}: FinishTaskModalProps): JSX.Element => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      wrapperClassName={cn(
        'max-w-[354px] md:max-w-[574px] lg:max-w-[878px] p-5 md:p-9',
        wrapperClassName
      )}
    >
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
      <FinishTaskModalContent onClose={onClose} onConfirm={onConfirm} />
    </ModalWrapper>
  );
};
