import { JSX } from 'react';
import { AccountContentPanel, AccountTaskList } from '@/components';
import { ContentProps, TaskListProps } from '@/types';
import { useTranslations } from 'next-intl';

export const UserTaskSection = ({ tasks }: TaskListProps): JSX.Element => {
  const t = useTranslations('account');
  const views = t.raw('tasksSection') as ContentProps[];

  const tasksCreated = tasks?.filter(({ status }) => status === 'CREATED');
  const tasksCompleted = tasks?.filter(({ status }) => status === 'COMPLETED');
  const tasksInProgress = tasks?.filter(
    ({ status }) => status === 'IN_PROGRESS'
  );

  const viewComponents: Record<string, React.ReactNode> = {
    tasksCreated: <AccountTaskList tasks={tasksCreated} />,
    tasksCompleted: <AccountTaskList tasks={tasksCompleted} />,
    tasksInProgress: <AccountTaskList tasks={tasksInProgress} />,
  };

  return <AccountContentPanel views={views} viewComponents={viewComponents} />;
};
