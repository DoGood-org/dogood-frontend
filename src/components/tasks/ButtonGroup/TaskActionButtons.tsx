'use client';

import { Button } from '@/components/ui/Button';
import { DonationModal } from '@/components/ui/modals/DonationModal/DonationModal';
import { useMenuToggle } from '@/hooks/useMenuToggle';
import { useTranslations } from 'next-intl';
import {
  TaskActionType,
  TaskStatus,
  UserParticipationStatus,
} from '@/types/tasks.type';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { JSX } from 'react';

interface TaskActionButtonsProps {
  taskId: string;
  actionType: TaskActionType;
  isHost: boolean;
  taskStatus: TaskStatus;
  userParticipationStatus: UserParticipationStatus;
  className?: string;
}

export const TaskActionButtons = ({
  taskId,
  actionType,
  isHost,
  className = '',
}: TaskActionButtonsProps): JSX.Element | null => {
  const t = useTranslations('map');
  const { joinTask } = useTaskStore();

  const {
    isOpen: isModalOpen,
    openMenu: openModal,
    closeMenu: closeModal,
  } = useMenuToggle();

  const isFundraising = actionType === TaskActionType.FUNDRAISING;

  const baseButtonClass = `leading-[32px] ${className}`;

  if (isHost && !isFundraising) {
    return null;
  }

  const SeeMoreButton = (
    <Button
      variant="secondary"
      onClick={() => {}}
      className={baseButtonClass}
      size="lg"
    >
      {t('seeMoreBtn')}
    </Button>
  );

  if (isFundraising) {
    return (
      <div className="flex w-full justify-between">
        <Button
          variant="primary"
          onClick={openModal}
          className={`${baseButtonClass} text-white`}
          size="lg"
        >
          {t('donateBtn')}
        </Button>
        {SeeMoreButton}
        <DonationModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-between">
      <Button
        variant="primary"
        onClick={() => joinTask(taskId)}
        className={`${baseButtonClass} text-white`}
        size="lg"
      >
        {t('join')}
      </Button>
      {SeeMoreButton}
    </div>
  );
};
