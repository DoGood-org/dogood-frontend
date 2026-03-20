'use client';

import { ModalCloseButton } from '@/components/ui/ModalCloseButton';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { cn } from '@/lib/utils';
import { JSX } from 'react';
import { RequiredFieldsContent } from './RequiredFieldsContent';

interface RequiredFieldsModalProps {
  isOpen: boolean;
  onClose: () => void;
  wrapperClassName?: string;
}

export const RequiredFieldsModal = ({
  isOpen,
  onClose,
  wrapperClassName = '',
}: RequiredFieldsModalProps): JSX.Element => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      wrapperClassName={cn(
        'flex justify-center item-center px-8 py-10 max-w-[354px] md:max-w-[574px] lg:max-w-[878px] bg-[#696969] text-white',
        wrapperClassName
      )}
    >
      <ModalCloseButton
        onClick={onClose}
        className="top-5 right-5"
        iconClassName="hover:text-[#999999] "
      />
      <RequiredFieldsContent onClose={onClose} />
    </ModalWrapper>
  );
};
