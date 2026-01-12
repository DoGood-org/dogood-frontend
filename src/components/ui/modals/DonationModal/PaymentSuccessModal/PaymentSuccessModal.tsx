'use client';

import { JSX } from 'react';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { cn } from '@/lib/utils';
import { PaymentSuccessContent } from './PaymentSuccessContent';
import { ModalCloseButton } from '@/components/ui/ModalCloseButton';

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
      <ModalCloseButton
        onClick={onClose}
        className="top-5 right-5 
        md:top-9 md:right-9"
      />
      <PaymentSuccessContent />
    </ModalWrapper>
  );
};
