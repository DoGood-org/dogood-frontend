'use client';
import { useTranslations } from 'next-intl';
import React, { JSX } from 'react';
import { TaskItem } from '@/components';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';

export const TasksList = (): JSX.Element => {
  const t = useTranslations('map');
  const { paginatedTasks } = useFilteredTasksSelector();

  return (
    <div className=" lg:flex lg:absolute lg:z-[450] lg:top-36 lg:left-32">
      <div className="mt-4 relative w-full lg:w-[487px] h-[660px] overflow-y-auto shadow-lg custom-scrollbar">
        <div className="w-full bg-card  pl-8 pr-[20px] pb-8 lg:p-8 lg:rounded-xl">
          <h2 className="text-h3 mb-6">{t('tasksTitle')}</h2>
          <ul className="list-none">
            {paginatedTasks.map((task) => (
              <li key={task.id} className="mb-6 last:mb-0">
                <TaskItem {...task} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
