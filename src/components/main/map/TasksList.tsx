'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Description, TaskItem } from '@/components';

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
    <div className="md:flex md:absolute md:z-[450] md:top-36 md:left-24">
      {/* Tasks List Panel */}
      <div className="w-full md:w-[358px] xl:w-[478px] h-[580px] bg-background p-8 rounded-[10px] shadow-lg overflow-y-auto custom-scrollbar">
        <h3 className="text-2xl font-bold mb-8">{t('tasksTitle')}</h3>
        <ul className="list-none">
          {TASKS.map((task, idx) => (
            <li key={idx} className="mb-8 last:mb-0">
              <TaskItem
                {...task}
                isSelected={selectedTask === idx}
                onToggleDescription={() => handleTaskSelect(idx)}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Description Panel - shown only when a task is selected */}
      {selectedTask !== null && (
        <Description
          description={TASKS[selectedTask].description}
          title={TASKS[selectedTask].title}
          distance={TASKS[selectedTask].distance}
          category={TASKS[selectedTask].category}
          subtitle={TASKS[selectedTask].subtitle}
          onToggleDescription={() => handleTaskSelect(selectedTask)}
        />
      )}
    </div>
  );
};
