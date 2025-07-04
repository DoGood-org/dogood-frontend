'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { TaskItem } from '@/components';
import { ITask } from '@/types/mapType';

type Props = {
  tasks: ITask[];
};
export const TasksList: React.FC<Props> = ({ tasks }) => {
  const t = useTranslations('map');
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleTaskSelect = (index: number): void => {
    setSelectedTask(selectedTask === index ? null : index);
  };

  return (
    <div className=" lg:flex lg:absolute lg:z-[450] lg:top-36 lg:left-32">
      <div className="mt-4 relative w-full lg:w-[487px] h-[660px] overflow-y-auto shadow-lg custom-scrollbar">
        <div className="w-full bg-card  pl-8 pr-[20px] pb-8 lg:p-8 lg:rounded-xl">
          <h2 className="text-h3 mb-6 text-white">{t('tasksTitle')}</h2>
          <ul className="list-none">
            {tasks.map((task, idx) => (
              <li key={idx} className="mb-6 last:mb-0">
                <TaskItem
                  {...task}
                  isSelected={selectedTask === idx}
                  onToggleDescription={() => handleTaskSelect(idx)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
