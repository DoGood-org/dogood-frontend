'use client';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { Button } from '@/components/ui/Button';
import { DonationModal } from '@/components/ui/modals/DonationModal/DonationModal';
import { useMenuToggle } from '@/hooks/useMenuToggle';
import {
  TaskActionType,
  TaskStatus,
  UserParticipationStatus,
} from '@/types/tasks.type';
import { useTranslations } from 'next-intl';
import { FinishTaskModal } from '@/components/tasks/FinishTaskModal/FinishTaskModal';

interface TaskControlButtonsProps {
  taskId: string;
  actionType: TaskActionType;
  userParticipationStatus: UserParticipationStatus;
  taskStatus: TaskStatus;
  isHost: boolean;
  className?: string;
}

export const TaskControlButtons: React.FC<TaskControlButtonsProps> = ({
  taskId,
  actionType,
  taskStatus,
  isHost,
  className = '',
}) => {
  const t = useTranslations('map');
  const { updateTaskStatus } = useTaskStore();

  const finishModal = useMenuToggle();
  const donateModal = useMenuToggle();

  const handleFinishTask = (): void => {
    updateTaskStatus(taskId, 'COMPLETED');
    finishModal.closeMenu();
  };

  const handleCloseTask = (): void => {
    updateTaskStatus(taskId, 'CLOSED');
  };

  const isFundraising = actionType === TaskActionType.FUNDRAISING;

  const isActive = taskStatus !== 'COMPLETED' && taskStatus !== 'CLOSED';

  if (!isActive) return null;

  const showHostButtons = isHost && !isFundraising;
  const showDonateButton = isFundraising;

  return (
    <div className={`w-full flex ${className}`}>
      {showHostButtons && (
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
