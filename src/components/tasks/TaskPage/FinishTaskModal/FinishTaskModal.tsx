'use client';

import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { FinishTaskModalContent } from '@/components/tasks/taskPage/FinishTaskModal/FinishTaskModalContent';
import { JSX } from 'react';
import { cn } from '@/lib/utils';
import { ModalCloseButton } from '@/components/ui/ModalCloseButton';

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
        'max-w-[354px] md:max-w-[574px] lg:max-w-[878px] py-10 px-8 lg:py-20 lg:px-50 bg-[#696969] text-white',
        wrapperClassName
      )}
    >
      <ModalCloseButton
        onClick={onClose}
        className="top-5 right-5"
        iconClassName="hover:text-[#999999] "
      />
      <FinishTaskModalContent onClose={onClose} onConfirm={onConfirm} />
    </ModalWrapper>
  );
};
