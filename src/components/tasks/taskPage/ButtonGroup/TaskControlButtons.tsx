'use client';

import { useState } from 'react';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { Button } from '@/components/ui/Button';
import { DonationModal } from '@/components/ui/modals/DonationModal/DonationModal';
import { useMenuToggle } from '@/hooks/useMenuToggle';
import { TaskStatus } from '@/types/tasks.type';
import { useTranslations } from 'next-intl';
import { FinishTaskModal } from '@/components/tasks/taskPage/FinishTaskModal/FinishTaskModal';
import { TaskCategoryEnum } from '@/types/createTask.type';
import { updateTaskStatusService } from '@/services/taskService';
import { CloseTaskModal } from '../CloseTaskModal/CloseTaskModal';

interface TaskControlButtonsProps {
  taskId: string;
  categories: TaskCategoryEnum[];
  taskStatus: TaskStatus;
  isHost: boolean;
  className?: string;
  onStatusChange?: (status: TaskStatus) => void;
}

export const TaskControlButtons: React.FC<TaskControlButtonsProps> = ({
  taskId,
  taskStatus,
  isHost,
  categories,
  className = '',
  onStatusChange,
}) => {
  const t = useTranslations('map');
  const updateTaskStatus = useTaskStore((s) => s.updateTaskStatus);

  const finishModal = useMenuToggle();
  const closeModal = useMenuToggle();
  const donateModal = useMenuToggle();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isActive =
    taskStatus !== TaskStatus.COMPLETED && taskStatus !== TaskStatus.CLOSED;

  if (!isActive) return null;

  const isFundraising = categories.includes(TaskCategoryEnum.Donation);
  const showHostFinishButtons =
    isHost &&
    (taskStatus === TaskStatus.IN_PROGRESS ||
      taskStatus === TaskStatus.PENDING);
  const showDonateButton = isFundraising && !isHost;

  const changeStatus = async (
    status: TaskStatus.COMPLETED | TaskStatus.CLOSED,
    closeModalFn: () => void
  ): Promise<void> => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    const res = await updateTaskStatusService(taskId, status);
    setIsLoading(false);

    if (!res.ok) {
      setError(res.errorMessage);
      return;
    }

    updateTaskStatus(taskId, status);
    onStatusChange?.(status);
    closeModalFn();
  };

  const handleFinishTask = (): Promise<void> =>
    changeStatus(TaskStatus.COMPLETED, finishModal.closeMenu);

  const handleCloseTask = (): Promise<void> =>
    changeStatus(TaskStatus.CLOSED, closeModal.closeMenu);

  const openFinish = (): void => {
    setError(null);
    finishModal.openMenu();
  };
  const openClose = (): void => {
    setError(null);
    closeModal.openMenu();
  };

  return (
    <div className={`w-full flex ${className}`}>
      {showHostFinishButtons && (
        <div
          className="w-full flex justify-center gap-2 flex-col md:justify-end
          md:gap-12 md:flex-row mb-20 md:mb-0"
        >
          <Button variant="primary" size="lg" onClick={openFinish}>
            {t('markAsFinished')}
          </Button>
          <Button
            variant="secondary"
            className="hover:border"
            size="lg"
            onClick={openClose}
          >
            {t('closeThisTask')}
          </Button>
        </div>
      )}

      {showDonateButton && (
        <div className="w-full flex justify-end mb-20 md:mb-0">
          <Button
            variant="primary"
            size="lg"
            onClick={donateModal.openMenu}
            className="text-white"
          >
            {t('donateBtn')}
          </Button>
        </div>
      )}

      <FinishTaskModal
        isOpen={finishModal.isOpen}
        onClose={finishModal.closeMenu}
        onConfirm={handleFinishTask}
        isLoading={isLoading}
        error={error}
      />

      <CloseTaskModal
        isOpen={closeModal.isOpen}
        onClose={closeModal.closeMenu}
        onConfirm={handleCloseTask}
        isLoading={isLoading}
        error={error}
      />

      <DonationModal
        isOpen={donateModal.isOpen}
        onClose={donateModal.closeMenu}
      />
    </div>
  );
};
