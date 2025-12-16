'use client';

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
  actionType,
  isHost,
  className = '',
}) => {
  const t = useTranslations('map');

  const {
    isOpen: isDonateOpen,
    openMenu: openDonate,
    closeMenu: closeDonate,
  } = useMenuToggle();

  const {
    isOpen: isFinishOpen,
    openMenu: openFinish,
    closeMenu: closeFinish,
  } = useMenuToggle();

  const handleCloseTask = (): void => {};

  const isFundraising = actionType === TaskActionType.FUNDRAISING;

  return (
    <div className={`w-full flex ${className}`}>
      {isHost && !isFundraising && (
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
            onClick={handleCloseTask}
          >
            {t('closeThisTask')}
          </Button>
        </div>
      )}

      {isFundraising && (
        <div className="w-full flex justify-end mb-20 md:mb-0">
          <Button
            variant="primary"
            size="lg"
            onClick={openDonate}
            className="text-white"
          >
            {t('donateBtn')}
          </Button>
        </div>
      )}
      <FinishTaskModal
        isOpen={isFinishOpen}
        onClose={closeFinish}
        onConfirm={closeFinish}
      />

      <DonationModal isOpen={isDonateOpen} onClose={closeDonate} />
    </div>
  );
};
