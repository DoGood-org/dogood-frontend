'use client';

import { JSX } from 'react';
import { CloseTaskModalContent } from './CloseTaskModalContent';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { ModalCloseButton } from '@/components/ui/ModalCloseButton';
import { cn } from '@/lib/utils';

interface CloseTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  error?: string | null;
  wrapperClassName?: string;
}

export const CloseTaskModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  error = null,
  wrapperClassName = '',
}: CloseTaskModalProps): JSX.Element | null => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      wrapperClassName={cn(
        'max-w-[354px] md:max-w-[574px] lg:max-w-[878px] py-10 px-8 lg:py-20 lg:px-50 bg-[#696969] text-white',
        wrapperClassName
      )}
    >
      <ModalCloseButton
        onClick={onClose}
        className="top-5 right-5"
        iconClassName="hover:text-[#999999] "
      />
      <CloseTaskModalContent
        onClose={onClose}
        onConfirm={onConfirm}
        isLoading={isLoading}
        error={error}
      />
    </ModalWrapper>
  );
};
