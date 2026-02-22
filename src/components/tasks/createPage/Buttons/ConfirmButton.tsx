'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { JSX } from 'react';

interface ConfirmButtonProps {
  disabled?: boolean;
  onConfirm?: () => void;
  className?: string;
}

export const ConfirmButton = ({
  disabled,
  onConfirm,
  className,
}: ConfirmButtonProps): JSX.Element => {
  const nextCreateStep = useCreateTaskStore((s) => s.nextCreateStep);

  const handleConfirm = (): void => {
    onConfirm?.();
    nextCreateStep();
  };

  return (
    <div className={cn('flex justify-end', className)}>
      <Button
        variant="primary"
        size="lg"
        className="disabled:opacity-50 max-w-[113px] w-full"
        onClick={handleConfirm}
        disabled={disabled}
      >
        Confirm
      </Button>
    </div>
  );
};
