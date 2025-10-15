'use client';

import {
  generateMockTasks,
  generateTasks,
} from '@/components/main/map/mockTasks';
import { useTranslations } from 'next-intl';
import { IExtendedITaskProps } from '@/types/tasks.type';

import { OtherTaskList } from './OtherTaskList';
import { useEffect, useState } from 'react';

type Props = {
  tasks: IExtendedITaskProps[];
  className?: string;
};

export const OtherTasksSection: React.FC<Props> = ({ tasks }) => {
  const [displayedTasks, setDisplayedTasks] = useState<IExtendedITaskProps[]>(
    []
  );

  const t = useTranslations('tasks');

  useEffect(() => {
    setDisplayedTasks(
      tasks.length > 0
        ? tasks
        : generateMockTasks(generateTasks(49.8429, 24.0316))
    );
  }, [tasks]);
  return (
    <section>
      <h2 className="text-h3 mb-6">{t('otherTask.otherTask')}</h2>
      <div
        className={
          'flex flex-wrap items-center gap-5 overflow-x-auto custom-scrollbar-tasks space-x-4'
        }
      >
        <OtherTaskList tasks={displayedTasks} />
      </div>
    </section>
  );
};
