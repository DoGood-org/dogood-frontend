'use client';

import { ModalWrapper } from '@/components/ui/ModalWrapper';
import React, { JSX, ReactNode } from 'react';

interface TaskActionModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: ReactNode;
}

export const TaskActionModal: React.FC<TaskActionModalProps> = ({
  isOpen,
  setIsOpen,
  children,
}): JSX.Element => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      wrapperClassName="w-full md:max-w-[648px] lg:max-w-[679px] lg:translate-x-16 bg-card"
    >
      {children}
    </ModalWrapper>
  );
};
