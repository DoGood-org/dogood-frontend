'use client';

import { useTranslations } from 'next-intl';
import { MoreMenu } from '@/components/ui/MoreMenu';
import { Approved, Rejected, TrashBinChat } from '@/components/icons';
import { MenuAction } from '@/components/ui/MenuAction';
import { useMediaQuery } from '@/hooks';
import { JSX, useState } from 'react';
import { ActionConfig, IAdminTask } from '@/types/admin';
import { useTaskStatus } from '@/hooks/useTaskStatus';
import { DeleteTaskForm } from './DeleteTaskForm';
import { RejectTaskForm } from './RejectTaskForm';
import { TaskActionModal } from './TaskActionModal';

export const TaskAdminMenu = ({ task }: { task: IAdminTask }): JSX.Element => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRejectedModalOpen, setIsRejectedModalOpen] = useState(false);
  const t = useTranslations('adminTasks');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { updateStatus } = useTaskStatus();

  const actions: ActionConfig[] = [
    {
      id: 'confirmed',
      icon: Approved,
      label: t('approved'),
      action: (): void => {
        void updateStatus({ taskId: task.id, status: 'COMPLETED' });
      },
    },
    {
      id: 'rejected',
      icon: Rejected,
      label: t('rejected'),
      action: () => setIsRejectedModalOpen(true),
    },
    {
      id: 'delete',
      icon: TrashBinChat,
      label: t('delete'),
      action: () => setIsDeleteModalOpen(true),
    },
  ];

  const items = actions.map((action) => ({
    id: action.id,
    content: (close: () => void): JSX.Element => (
      <MenuAction
        icon={action.icon}
        label={action.label}
        href={action.href}
        onClick={() => {
          close();
          action.action?.();
        }}
        iconClassName="size-5 shrink-0"
      />
    ),
  }));

  return (
    <div className="rotate-90">
      <MoreMenu
        items={items}
        side={isMobile ? 'bottom' : 'left'}
        align={isMobile ? 'end' : 'start'}
        menuWrapperClassName="
          translate-y-2
          md:-translate-y-3
          md:-translate-x-[14px]
          px-[30px] py-7
        "
        className="py-0"
      />
      <TaskActionModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      >
        <DeleteTaskForm
          taskId={task.id}
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
        />
      </TaskActionModal>

      <TaskActionModal
        isOpen={isRejectedModalOpen}
        setIsOpen={setIsRejectedModalOpen}
      >
        <RejectTaskForm
          taskId={task.id}
          isOpen={isRejectedModalOpen}
          setIsOpen={setIsRejectedModalOpen}
        />
      </TaskActionModal>
    </div>
  );
};
