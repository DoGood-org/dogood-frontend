import Image from 'next/image';
import React from 'react';
import { CategoryIcons } from './CategoryIcons';
import { StatusIcon } from './StatusIcon';
import { TaskAdminMenu } from './TaskAdminMenu';
import { useTranslations } from 'next-intl';
import { HighlightText } from '@/components/supportPage/HighlightText';
import { IAdminTask } from '@/types/admin';

const TaskItemMob = ({
  task,
  searchQuery,
}: {
  task: IAdminTask;
  searchQuery: string;
}): React.JSX.Element => {
  const t = useTranslations('adminTasks');

  return (
    <div className="flex flex-col w-full bg-modal gap-2 rounded-md p-3 cursor-pointer">
      <span className="flex gap-2 items-baseline text-reg">
        <CategoryIcons categories={task.categories} sizeClassName="w-6 h-6" />
        <HighlightText text={task.title} highlight={searchQuery} />
      </span>
      <div className="flex gap-2">
        <Image
          src={task.picture ? task.picture : '/account/avatar.png'}
          alt={task.title}
          width={76}
          height={76}
          className="object-cover rounded-md"
        />
        <div className="w-full flex flex-col justify-between items-start">
          <span className="text-text-help mb-2">Organized by: </span>
          <span>
            {task.host?.type === 'USER'
              ? task.host?.user?.name
              : task.host?.organization?.name}
          </span>
          <div className="w-full flex justify-between items-center">
            <span className="flex gap-3">
              {t('status')}
              <StatusIcon status={task.status} />
            </span>
            <TaskAdminMenu task={task} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItemMob;
