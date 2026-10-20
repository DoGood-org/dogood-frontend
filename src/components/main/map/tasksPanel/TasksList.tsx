'use client';
import { useTranslations } from 'next-intl';
import React, { JSX } from 'react';
import { IExtendedITaskProps } from '@/types/tasks.type';
import { TaskItem } from './TaskItem';

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
    <div className={`flex flex-col h-full ${className}`}>
      <div className={'h-full lg:h-[722px] flex-1 w-full'}>
        <div className="flex flex-col w-full lg:rounded-xl">
          <h2 className="text-h3 mb-6">{t('tasksTitle')}</h2>
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
