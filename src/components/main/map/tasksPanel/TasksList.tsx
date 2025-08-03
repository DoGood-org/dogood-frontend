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
    <div className={`flex-1 h-full pl-2 pr-2 lg:px-8 ${className}`}>
      <div
        className={
          'h-[713px] lg:h-[722px]  overflow-y-scroll custom-scrollbar-tasks'
        }
      >
        <h2 className="text-h3 mb-6">{t('tasksTitle')}</h2>{' '}
        <div className="flex flex-col w-full bg-card pl-3 pr-2 lg:px-6 pb-8 pt-4 lg:rounded-xl">
          <ul className="list-none w-full">
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
