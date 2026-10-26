'use client';

import { Button } from '@/components/ui/Button';
import { DonationModal } from '@/components/ui/modals/DonationModal/DonationModal';
import { useMenuToggle } from '@/hooks/useMenuToggle';
import { useTranslations } from 'next-intl';
import { TaskStatus } from '@/types/tasks.type';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { JSX } from 'react';
import { TaskCategoryEnum } from '@/types/createTask.type';
import { isDonationCategory } from '@/utils/isDonationCategory';
import { useRouter } from 'next/navigation';

interface TaskActionButtonsProps {
  taskId: string;
  isHost: boolean;
  taskStatus: TaskStatus;
  className?: string;
  category: TaskCategoryEnum | TaskCategoryEnum[];
}

export const TaskActionButtons = ({
  taskId,
  category,
  isHost,
  className = '',
}: TaskActionButtonsProps): JSX.Element | null => {
  const t = useTranslations('map');

  const isJoined = useTaskStore(
    (s) => !!s.tasks.find((task) => task.id === taskId)?.isSelected
  );
  const joinTask = useTaskStore((s) => s.joinTask);

  const router = useRouter();

  const {
    isOpen: isModalOpen,
    openMenu: openModal,
    closeMenu: closeModal,
  } = useMenuToggle();

  const isDonation = isDonationCategory(category);

  const baseButtonClass = `leading-[32px] ${className}`;

  if (isHost && !isDonation) {
    return null;
  }

  return (
    <div className="flex w-full justify-between mt-4">
      {isDonation ? (
        <Button
          variant="primary"
          onClick={(e) => {
            e.stopPropagation();
            openModal();
          }}
          className={`${baseButtonClass} text-white w-full max-w-[150px] py-3 px-6`}
          size="lg"
        >
          {t('donateBtn')}
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={(e) => {
            e.stopPropagation();
            if (!isJoined) joinTask(taskId);
            router.push(`/tasks/${taskId}`);
          }}
          className={`${baseButtonClass} text-white w-full max-w-[114px] py-3 px-6`}
          size="lg"
        >
          {isJoined ? t('joined') : t('join')}
        </Button>
      )}

      <Button
        variant="secondary"
        className={`${baseButtonClass} py-2 px-4`}
        size="lg"
        onClick={() => router.push(`/tasks/${taskId}`)}
      >
        {t('seeMoreBtn')}
      </Button>

      {isDonation && (
        <DonationModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};
