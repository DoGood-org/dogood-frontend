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

  const isFundraising = actionType === TaskActionType.FUNDRAISING;

  return (
    <div className={`w-full flex justify-end space-x-2 ${className}`}>
      {isHost && !isFundraising && (
        <div className="flex w-full justify-end gap-6 flex-col md:flex-row lg:gap-12">
          <Button variant="primary" size="lg" onClick={openFinish}>
            {t('markAsFinished')}
          </Button>
          <Button variant="secondary" size="lg" onClick={() => {}}>
            {t('closeThisTask')}
          </Button>
          <FinishTaskModal
            isOpen={isFinishOpen}
            onClose={closeFinish}
            onConfirm={() => {
              closeFinish();
            }}
          />
        </div>
      )}

      {isFundraising && (
        <>
          <Button
            variant="primary"
            size="lg"
            onClick={openDonate}
            className="text-white"
          >
            {t('donateBtn')}
          </Button>
          <DonationModal isOpen={isDonateOpen} onClose={closeDonate} />
        </>
      )}
    </div>
  );
};
