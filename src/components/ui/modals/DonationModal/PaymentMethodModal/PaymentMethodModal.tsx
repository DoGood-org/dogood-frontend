'use client';

import { JSX, useState } from 'react';
import { cn } from '@/lib/utils';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { StyledCardForm } from './StyledCardForm';
import { ModalCloseButton } from '@/components/ui/ModalCloseButton';

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
  const [, setIsSubmitting] = useState(false);

  const handleSuccess = (): void => {
    setIsSubmitting(false);
    onClose();
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
      <ModalCloseButton
        onClick={onClose}
        className="top-5
            right-5  md:top-9 md:right-9"
      />

      <StyledCardForm
        onSuccess={handleSuccess}
        setIsSubmitting={setIsSubmitting}
      />
    </ModalWrapper>
  );
};
