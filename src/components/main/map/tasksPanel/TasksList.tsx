'use client';
import { useTranslations } from 'next-intl';
import React, { JSX } from 'react';
import { TaskItem } from '@/components';

import { IExtendedITaskProps } from '@/types/tasks.type';
type Props = {
  tasks: IExtendedITaskProps[];
  className?: string;
};
export const TasksList: React.FC<Props> = ({
  tasks,
  className,
}): JSX.Element => {
  const t = useTranslations('map');
  return (
    <div
      className={`bg-card flex flex-col pl-2 pr-2 lg:px-8 border-4 ${className}`}
    >
      <div
        className={
          'h-[745px] lg:h-[722px] w-full overflow-y-auto custom-scrollbar-tasks'
        }
      >
        <div className="flex flex-col w-full bg-card pl-3 pr-2 lg:px-6 pb-8 pt-4 lg:rounded-xl">
          <h2 className="text-h3 mb-6">{t('tasksTitle')}</h2>
          <ul className="list-none space-y-6 w-full">
            {tasks.map((task) => (
              <li key={task.id}>
                <TaskItem {...task} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
