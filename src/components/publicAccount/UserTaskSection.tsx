'use client';

import { JSX, useState, useMemo } from 'react';
import { AccountContentPanel, AccountTaskList } from '@/components';
import { ContentProps, TaskListProps } from '@/types';
import { useTranslations } from 'next-intl';

export const UserTaskSection = ({ tasks = [] }: TaskListProps): JSX.Element => {
  const t = useTranslations('account');
  const views = t.raw('tasksSection') as ContentProps[];

  const [filteredTasks, setFilteredTasks] = useState(tasks || []);

  const handleFilterChange = (status: string): void => {
    if (status === 'ALL') setFilteredTasks(tasks);
    else
      setFilteredTasks(tasks?.filter((task) => task.status === status) || []);
  };

  // масив статусів і відповідних ключів для views
  const statusMap = [
    { key: 'tasksCreated', status: 'CREATED' },
    { key: 'tasksInProgress', status: 'IN_PROGRESS' },
    { key: 'tasksCompleted', status: 'COMPLETED' },
  ];

  // генеруємо viewComponents динамічно
  const viewComponents = useMemo(() => {
    const components: Record<string, React.ReactNode> = {};
    statusMap.forEach(({ key, status }) => {
      components[key] = (
        <AccountTaskList
          tasks={filteredTasks.filter((t) => t.status === status)}
        />
      );
    });
    return components;
  }, [filteredTasks]);

  return (
    <AccountContentPanel
      views={views}
      viewComponents={viewComponents}
      onFilterChange={handleFilterChange}
    />
  );
};
