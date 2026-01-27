'use client';

import { Button } from '@/components/ui/Button';
import { TaskOwnerId } from '@/types/tasks.type';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { JSX } from 'react';

interface ConfirmButtonProps {
  disabled?: boolean;
  owner?: TaskOwnerId | null;
  onConfirm?: () => void;
}

export const ConfirmButton = ({
  disabled,
  onConfirm,
  owner,
}: ConfirmButtonProps): JSX.Element => {
  const nextCreateStep = useTaskStore((s) => s.nextCreateStep);
  const setCreateTaskDraft = useTaskStore((s) => s.setCreateTaskDraft);

  const handleConfirm = (): void => {
    if (!owner) return;

    setCreateTaskDraft({ ownerType: owner });
    onConfirm?.();
    nextCreateStep();
  };

  const isDisabled = disabled || !owner;

  return (
    <div className="flex justify-end">
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
