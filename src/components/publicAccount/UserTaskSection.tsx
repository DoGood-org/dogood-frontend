'use client';

import { JSX, useMemo } from 'react';
import { AccountContentPanel, AccountTaskList } from '@/components';
import { ContentProps, TaskListProps } from '@/types';
import { useTranslations } from 'next-intl';

// масив статусів і відповідних ключів для views
const statusMap = [
  { key: 'tasksCreated', status: 'CREATED' },
  { key: 'tasksInProgress', status: 'IN_PROGRESS' },
  { key: 'tasksCompleted', status: 'COMPLETED' },
];
export const UserTaskSection = ({ tasks = [] }: TaskListProps): JSX.Element => {
  const t = useTranslations('account');
  const views = t.raw('tasksSection') as ContentProps[];

  // генеруємо viewComponents динамічно
  const viewComponents = useMemo(() => {
    const components: Record<string, React.ReactNode> = {};
    statusMap.forEach(({ key, status }) => {
      components[key] = (
        <AccountTaskList tasks={tasks.filter((t) => t.status === status)} />
      );
    });
    return components;
  }, [tasks]);

  return <AccountContentPanel views={views} viewComponents={viewComponents} />;
};
