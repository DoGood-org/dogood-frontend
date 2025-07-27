'use client';
import { useTranslations } from 'next-intl';
import React, { JSX } from 'react';
import { TaskItem } from '@/components';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';

export const TasksList: React.FC = (): JSX.Element => {
  const t = useTranslations('map');
  const { noPaginatedTasks } = useFilteredTasksSelector();
  return (
    <div className="pl-2 pr-2 lg:px-8">
      <div className="mt-4 h-[660px] lg:h-[722px] w-full lg:mt-0 overflow-y-auto custom-scrollbar-tasks ">
        <div className="bg-card pl-3 pr-2 lg:px-6 pb-8 pt-4 lg:rounded-xl">
          <h2 className="text-h3 mb-6">{t('tasksTitle')}</h2>
          <ul className="list-none space-y-6">
            {noPaginatedTasks.map((task) => (
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
