'use client';

import { Button } from '@/components/ui/Button';
import { JSX } from 'react';

interface FinishTaskModalContentProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const FinishTaskModalContent = ({
  onClose,
  onConfirm,
}: FinishTaskModalContentProps): JSX.Element => {
  return (
    <section>
      <h2 className="text-h1">Is your task realy finished?</h2>
      <p className="text-base">Choose “Confirm” to close your task.</p>
      <div className="flex flex-col md:flex-row md:justify-center">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </section>
  );
};
