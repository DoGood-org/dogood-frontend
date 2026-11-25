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

  const isOnMap =
    taskStatus === TaskStatus.CREATED || taskStatus === TaskStatus.IN_PROGRESS;

  if (!isOnMap) return null;

  const showHostFinishButtons = isHost;
  const showDonateButton = categories.includes(TaskCategoryEnum.Donation);

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
    <div
      className={`w-full flex flex-col items-center lg:flex-row lg:justify-end lg:items-start lg:gap-5 ${className}`}
    >
      {showHostFinishButtons && (
        <div
          className={`w-full flex flex-col gap-3 mb-10
            md:flex-row md:justify-end md:gap-2 md:mb-0
            ${showDonateButton ? 'lg:w-auto lg:justify-end' : 'lg:w-full lg:justify-end'}`}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={openFinish}
            className="w-full md:w-auto"
          >
            {t('markAsFinished')}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={openClose}
            className="w-full hover:border md:w-auto"
          >
            {t('closeThisTask')}
          </Button>
        </div>
      )}

      {showDonateButton && (
        <div className="w-full flex justify-center mb-10 md:justify-end md:mt-3 lg:mt-0 lg:w-auto lg:mb-0">
          <Button
            variant="primary"
            size="lg"
            onClick={donateModal.openMenu}
            className="w-full text-white md:w-auto"
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
