'use client';

import { CloseIcon } from '@/components/icons';
import { JSX } from 'react';
import { motion } from 'framer-motion';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { cn } from '@/lib/utils';
import { PaymentSuccessContent } from './PaymentSuccessContent';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  wrapperClassName?: string;
}

export const PaymentSuccessModal = ({
  isOpen,
  onClose,
  wrapperClassName,
}: PaymentSuccessModalProps): JSX.Element => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      wrapperClassName={cn(
        'relative max-w-[354px] md:max-w-[544px] lg:max-w-[994px] p-5 md:p-9',
        wrapperClassName
      )}
    >
      <motion.button
        className="absolute top-5 right-5 md:top-10 md:right-10 cursor-pointer text_tag hover:text-[#696969] z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        aria-label="Close modal"
        type="button"
      >
        <CloseIcon className="w-6 h-6" />
      </motion.button>
      <PaymentSuccessContent />
    </ModalWrapper>
  );
};
