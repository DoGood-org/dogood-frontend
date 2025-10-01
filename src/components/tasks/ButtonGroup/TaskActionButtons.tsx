'use client';

import { Button } from '@/components/ui/Button';
// import { useTranslations } from 'next-intl';
import { TaskActionType, UserParticipationStatus } from '@/types/tasks.type';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { useRouter } from 'next/navigation';

interface TaskActionButtonsProps {
  taskId: string;
  actionType: TaskActionType;
  userParticipationStatus: UserParticipationStatus;
  className?: string;
}

export const TaskActionButtons: React.FC<TaskActionButtonsProps> = ({
  taskId,
  actionType,
  className = '',
  userParticipationStatus,
}) => {
  // const t = useTranslations('task');
  const { joinTask } = useTaskStore();

  const router = useRouter();

  const hasJoinedOrDonated =
    userParticipationStatus !== UserParticipationStatus.NONE;
  const isFundraising = actionType === TaskActionType.FUNDRAISING;

  const baseButtonClass = `leading-[32px] ${className}`;

  const buttons = [];

  if (hasJoinedOrDonated) {
    buttons.push(
      {
        label: 'Edit',
        /* {label: t('editBtn')} */
        variant: 'secondary',
        onClick: () => {},
        className: baseButtonClass,
      },
      {
        label: 'Confirm',
        /* {label: t('confirmBtn')} */
        variant: 'primary',
        onClick: () => {},
        className: `${baseButtonClass} text-white`,
      }
    );
  } else if (isFundraising) {
    buttons.push(
      {
        label: 'Donate',
        // {label: t('donateBtn'),
        variant: 'primary',
        onClick: () => router.push('/donate'),
        className: `${baseButtonClass} text-white`,
      },
      {
        label: 'See More',
        /* {label: t('seeMoreBtn')} */
        variant: 'secondary',
        onClick: () => {},
        className: `${baseButtonClass} bg-card`,
      }
    );
  } else {
    buttons.push(
      {
        label: 'Join',
        /* {label: t('joinBtn')} */
        variant: 'primary',
        onClick: () => joinTask(taskId),
        className: `${baseButtonClass} text-white`,
      },
      {
        label: 'See More',
        /* {label: t('seeMoreBtn')} */
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
          variant={btn.variant as any}
          size="lg"
          className={btn.className}
          onClick={btn.onClick}
        >
          {btn.label}
        </Button>
      ))}
    </>
  );
};
