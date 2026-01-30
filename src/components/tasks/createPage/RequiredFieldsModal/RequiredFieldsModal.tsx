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
        'max-w-[354px] md:max-w-[574px] lg:max-w-[878px] py-10 px-8 lg:py-20 lg:px-50 bg-[#696969] text-white',
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
