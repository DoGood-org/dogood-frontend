import React from 'react';
import { CategoryIcons } from './CategoryIcons';
import { StatusIcon } from './StatusIcon';
import Image from 'next/image';
import { TaskAdminMenu } from './TaskAdminMenu';
import { useTranslations } from 'next-intl';
import { HighlightText } from '@/components/supportPage/HighlightText';
import { IAdminTask } from '@/types/admin';

export const TaskItemDesk = ({
  task,
  searchQuery,
}: {
  task: IAdminTask;
  searchQuery: string;
}): React.JSX.Element => {
  const t = useTranslations('adminTasks');
  return (
    <div className="flex w-full bg-modal gap-4 rounded-md p-6 hover:shadow-admin hover:border-[#00BC7D1A] focus:shadow-admin focus:border-[#00BC7D1A] cursor-pointer">
      <Image
        src={task.picture ? task.picture : '/account/avatar.png'}
        alt={task.title}
        width={76}
        height={76}
        className="object-cover rounded-md"
      />
      <div className="w-full flex flex-col md:gap-1 lg:gap-2">
        <div className="flex w-full items-baseline justify-between">
          <span className="flex gap-2 items-baseline">
            <h3 className="...">
              <HighlightText text={task.title} highlight={searchQuery} />
            </h3>{' '}
            <CategoryIcons
              categories={task.categories}
              sizeClassName="w-6 h-6"
            />
          </span>
          <StatusIcon status={task.status} />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <span className="text-text-help">{t('organizedBy')}</span>
            <span>
              {task.host?.type === 'USER'
                ? task.host?.user?.name
                : task.host?.organization?.name}
            </span>
          </div>
          <TaskAdminMenu task={task} />
        </div>
      </div>
    </div>
  );
};
