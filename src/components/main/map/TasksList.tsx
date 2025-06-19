'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { TaskItem } from '@/components';

const TASKS = [
  {
    title: 'Assistance in organizing health days.',
    subtitle: 'Volunteer to help with free health days',
    category: ['Medicine', 'Animal'],
    distance: '3 km',
    description:
      'Volunteer to help run free health days for local residents. This may include blood pressure, sugar levels, basic counseling, or navigating the event location.',
  },
  {
    title: 'Partecipation in eco-patrol and care for homeless animals',
    subtitle: 'Partecipation in raids on urban and natural areas',
    category: ['Nature', 'Animal'],
    distance: '5 km',
    description:
      'Volunteer to help run free health days for local residents. This may include blood pressure, sugar levels, basic counseling, or navigating the event location.',
  },
  {
    title: 'Assistance in organizing health days.',
    subtitle: 'Volunteer to help with free health days',
    category: ['Medicine', 'Food'],
    distance: '10 km',

    description:
      'Volunteer to help run free health days for local residents. This may include blood pressure, sugar levels, basic counseling, or navigating the event location.',
  },
  {
    title: 'Partecipation in eco-patrol and care for homeless animals',
    subtitle: 'Partecipation in raids on urban and natural areas',
    category: ['Medicine', 'Animal'],
    distance: '5 km',
    description:
      'Volunteer to help run free health days for local residents. This may include blood pressure, sugar levels, basic counseling, or navigating the event location.',
  },
];
export const TasksList: React.FC = () => {
  const t = useTranslations('map');
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleTaskSelect = (index: number): void => {
    setSelectedTask(selectedTask === index ? null : index);
  };

  return (
    <div className="block static lg:flex lg:absolute lg:z-[450] lg:top-36 lg:left-32">
      <div className="relative w-full lg:w-[487px] overflow-hidden">
        <div className="w-full h-[650px] md:h-[658px] lg:h-[650px] bg-toggle pt-[40px] pl-8 pr-[20px] pb-8 lg:p-8 lg:rounded-xl shadow-lg custom-scrollbar overflow-y-auto">
          <h3 className="text-2xl mb-6">{t('tasksTitle')}</h3>
          <ul className="list-none">
            {TASKS.map((task, idx) => (
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

      {/* Description Panel - shown only when a task is selected
      {selectedTask !== null && (
        <Description
          description={TASKS[selectedTask].description}
          title={TASKS[selectedTask].title}
          distance={TASKS[selectedTask].distance}
          category={TASKS[selectedTask].category}
          subtitle={TASKS[selectedTask].subtitle}
          onToggleDescription={() => handleTaskSelect(selectedTask)}
        />
      )} */}
    </div>
  );
};
