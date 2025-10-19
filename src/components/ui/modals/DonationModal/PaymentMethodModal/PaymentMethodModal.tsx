'use client';

import { JSX, useState } from 'react';
import { motion } from 'framer-motion';
import { ModalWrapper } from '@/components';
import { CloseIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { StyledCardForm } from '@/components';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  wrapperClassName?: string;
}

export const PaymentMethodModal = ({
  isOpen,
  onClose,
  wrapperClassName = '',
}: PaymentMethodModalProps): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSuccess = (): void => {
    onClose();
    setIsSubmitting(false);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      wrapperClassName={cn(
        'relative max-w-[354px] md:max-w-[574px] lg:max-w-[994px] p-5 md:p-9',
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
        <CloseIcon
          className={cn(
            'w-6 h-6',
            isSubmitting && 'text-gray-400 cursor-not-allowed'
          )}
        />
      </motion.button>

      <StyledCardForm
        onSuccess={handleSuccess}
        setIsSubmitting={setIsSubmitting}
      />
    </ModalWrapper>
  );
};
