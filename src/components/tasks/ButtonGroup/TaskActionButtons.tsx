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
  // taskStatus,
  className = '',
  // userParticipationStatus,
}: TaskActionButtonsProps): JSX.Element => {
  const t = useTranslations('map');
  const { joinTask } = useTaskStore();

  const {
    isOpen: isModalOpen,
    openMenu: openModal,
    closeMenu: closeModal,
  } = useMenuToggle();

  // const hasJoinedOrDonated =
  //   userParticipationStatus !== UserParticipationStatus.NONE;
  const isFundraising = actionType === TaskActionType.FUNDRAISING;
  // const isActive = taskStatus === 'IN_PROGRESS';

  const baseButtonClass = `leading-[32px] ${className}`;

  const buttons = [];

  if (isHost) {
    if (isFundraising) {
      buttons.push({
        label: t('donateBtn'),
        variant: 'primary',
        onClick: openModal,
        className: `${baseButtonClass} text-white`,
      });
    }
  } else if (isFundraising) {
    buttons.push(
      {
        label: t('donateBtn'),
        variant: 'primary',
        onClick: openModal,
        className: `${baseButtonClass} text-white`,
      },
      {
        label: t('seeMoreBtn'),
        variant: 'secondary',
        onClick: () => {},
        className: `${baseButtonClass} bg-card`,
      }
    );
  } else {
    buttons.push(
      {
        label: t('join'),
        variant: 'primary',
        onClick: () => joinTask(taskId),
        className: `${baseButtonClass} text-white`,
      },
      {
        label: t('seeMoreBtn'),
        variant: 'secondary',
        onClick: () => {},
        className: `${baseButtonClass} bg-card`,
      }
    );
  }
  return (
    <>
      {buttons.map((btn, index) => (
        <Button
          key={index}
          variant={
            btn.variant as
              | 'secondary'
              | 'primary'
              | 'default'
              | 'ghost'
              | 'filters'
              | 'tag'
              | 'iconOnly'
          }
          size="lg"
          className={btn.className}
          onClick={btn.onClick}
        >
          {btn.label}
        </Button>
      ))}
      <DonationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
