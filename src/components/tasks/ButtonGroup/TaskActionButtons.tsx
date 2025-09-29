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
}

export const TaskActionButtons: React.FC<TaskActionButtonsProps> = ({
  taskId,
  actionType,
  userParticipationStatus,
}) => {
  // const t = useTranslations('task');
  const { joinTask } = useTaskStore();

  const router = useRouter();

  const hasJoinedOrDonated =
    userParticipationStatus !== UserParticipationStatus.NONE;
  const isFundraising = actionType === TaskActionType.FUNDRAISING;

  const SeeMoreButton = (
    <Button
      variant="secondary"
      size="lg"
      className="bg-card text-[14px] w-[152px] px-3"
    >
      {/* {t('seeMoreBtn')} */}
      See More
    </Button>
  );

  // Якщо користувач уже приєднався або зробив донат
  if (hasJoinedOrDonated) {
    return (
      <>
        <Button
          variant="secondary"
          size="lg"
          className="leading-[32px] w-[152px]"
        >
          {/* {t('editBtn')} */}
          Edit
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="
          leading-[32px] w-[152px]"
        >
          {/* {t('confirmBtn')} */}
          Confirm
        </Button>
      </>
    );
  }

  // Якщо це fundraising і користувач ще не донатив
  if (isFundraising) {
    return (
      <>
        <Button
          variant="primary"
          size="lg"
          className="w-[152px] text-white leading-[32px]"
          onClick={() => router.push('/donate')}
        >
          {/* {t('donateBtn')} */}
          Donate
        </Button>
        {SeeMoreButton}
      </>
    );
  }

  // Якщо це волонтерство і користувач ще не приєднався
  return (
    <>
      <Button
        variant="primary"
        size="lg"
        onClick={() => joinTask(taskId)}
        className="w-[152px] text-white leading-[32px]"
      >
        {/* {t('joinBtn')} */}
        Join
      </Button>
      {SeeMoreButton}
    </>
  );
};
