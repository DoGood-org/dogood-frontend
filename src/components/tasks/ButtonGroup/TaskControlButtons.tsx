'use client';

import { Button } from '@/components/ui/Button';
import { DonationModal } from '@/components/ui/modals/DonationModal/DonationModal';
import { useMenuToggle } from '@/hooks/useMenuToggle';
import { useTaskStore } from '@/zustand/stores/taskStore';
import {
  TaskActionType,
  TaskStatus,
  UserParticipationStatus,
} from '@/types/tasks.type';
import { useTranslations } from 'next-intl';

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
  isHost,
  className = '',
}) => {
  const t = useTranslations('map');
  const { joinTask } = useTaskStore();
  const {
    isOpen: isModalOpen,
    openMenu: openModal,
    closeMenu: closeModal,
  } = useMenuToggle();

  // Хостові кнопки
  if (isHost) {
    return (
      <div className={`flex space-x-2 ${className}`}>
        <Button variant="primary" onClick={() => {}}>
          Mark as finished
        </Button>
        <Button variant="secondary" onClick={() => {}}>
          Close this task
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex space-x-2 ${className}`}>
      {actionType === TaskActionType.FUNDRAISING && (
        <>
          <Button
            variant="primary"
            onClick={openModal}
            className="text-white w-full"
          >
            {t('donateBtn')}
          </Button>
          <DonationModal isOpen={isModalOpen} onClose={closeModal} />
        </>
      )}

      <Button
        variant="primary"
        onClick={() => joinTask(taskId)}
        className="text-white w-full"
      >
        {t('join')}
      </Button>
    </div>
  );
};
