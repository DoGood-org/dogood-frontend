'use client';

import { useTaskStore } from '@/zustand/stores/taskStore';
import { Button } from '@/components/ui/Button';
import { DonationModal } from '@/components/ui/modals/DonationModal/DonationModal';
import { useMenuToggle } from '@/hooks/useMenuToggle';
import { TaskStatus } from '@/types/tasks.type';
import { useTranslations } from 'next-intl';
import { FinishTaskModal } from '@/components/tasks/taskPage/FinishTaskModal/FinishTaskModal';
import { TaskCategoryEnum } from '@/types/createTask.type';

interface TaskControlButtonsProps {
  taskId: string;
  categories: TaskCategoryEnum[];
  taskStatus: TaskStatus;
  isHost: boolean;
  className?: string;
}

export const TaskControlButtons: React.FC<TaskControlButtonsProps> = ({
  taskId,
  taskStatus,
  isHost,
  categories,
  className = '',
}) => {
  const t = useTranslations('map');
  const { updateTaskStatus } = useTaskStore();

  const finishModal = useMenuToggle();
  const donateModal = useMenuToggle();

  const isActive =
    taskStatus !== TaskStatus.COMPLETED && taskStatus !== TaskStatus.CLOSED;

  if (!isActive) return null;

  const isFundraising = categories.includes(TaskCategoryEnum.Donation);
  const showHostFinishButtons =
    isHost &&
    (taskStatus === TaskStatus.IN_PROGRESS ||
      taskStatus === TaskStatus.PENDING);
  const showDonateButton = isFundraising && !isHost;

  const handleFinishTask = (): void => {
    updateTaskStatus(taskId, TaskStatus.COMPLETED);
    finishModal.closeMenu();
  };

  const handleCloseTask = (): void => {
    updateTaskStatus(taskId, TaskStatus.CLOSED);
  };

  return (
    <div className={`w-full flex ${className}`}>
      {showHostFinishButtons && (
        <div
          className="w-full flex justify-center gap-2 flex-col md:justify-end
          md:gap-12 md:flex-row mb-20 md:mb-0"
        >
          <Button variant="primary" size="lg" onClick={finishModal.openMenu}>
            {t('markAsFinished')}
          </Button>
          <Button
            variant="secondary"
            className="hover:border"
            size="lg"
            onClick={handleCloseTask}
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
      />

      <DonationModal
        isOpen={donateModal.isOpen}
        onClose={donateModal.closeMenu}
      />
    </div>
  );
};
