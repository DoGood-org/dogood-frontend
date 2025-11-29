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
  const { isOpen, openMenu, closeMenu } = useMenuToggle();

  const isFundraising = actionType === TaskActionType.FUNDRAISING;

  return (
    <div className={`w-full flex justify-end space-x-2 ${className}`}>
      {isHost && !isFundraising && (
        <>
          <Button variant="primary" size="lg" onClick={() => {}}>
            {t('markAsFinished')}
          </Button>
          <Button variant="secondary" size="lg" onClick={() => {}}>
            {t('closeThisTask')}
          </Button>
        </>
      )}

      {isFundraising && (
        <>
          <Button
            variant="primary"
            size="lg"
            onClick={openMenu}
            className="text-white"
          >
            {t('donateBtn')}
          </Button>
          <DonationModal isOpen={isOpen} onClose={closeMenu} />
        </>
      )}
    </div>
  );
};
