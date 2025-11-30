'use client';

import { Button, ModalWrapper } from '@/components';
import { JSX } from 'react';

interface FinishTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const FinishTaskModal = ({
  isOpen,
  onClose,
  onConfirm,
}: FinishTaskModalProps): JSX.Element => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-end space-x-3 mt-4">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </ModalWrapper>
  );
};
