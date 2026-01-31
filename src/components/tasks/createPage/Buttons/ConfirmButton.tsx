'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { TaskOwnerValue } from '@/types/tasks.type';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { JSX } from 'react';

interface ConfirmButtonProps {
  disabled?: boolean;
  owner?: TaskOwnerValue | null;
  onConfirm?: () => void;
  className?: string;
}

export const ConfirmButton = ({
  disabled,
  onConfirm,
  owner,
  className,
}: ConfirmButtonProps): JSX.Element => {
  const nextCreateStep = useCreateTaskStore((s) => s.nextCreateStep);
  const setCreateTaskDraft = useCreateTaskStore((s) => s.setCreateTaskDraft);

  const handleConfirm = (): void => {
    if (!owner) return;

    if (owner.type === 'USER') {
      setCreateTaskDraft({ organizationId: undefined });
    } else {
      setCreateTaskDraft({ organizationId: owner.organizationId });
    }
    onConfirm?.();
    nextCreateStep();
  };

  const isDisabled = disabled || !owner;

  return (
    <div className={cn('flex justify-end', className)}>
      <Button
        variant="primary"
        size="lg"
        className="disabled:opacity-50 max-w-[113px] w-full"
        onClick={handleConfirm}
        disabled={isDisabled}
      >
        Confirm
      </Button>
    </div>
  );
};
