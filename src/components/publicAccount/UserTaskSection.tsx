import { JSX } from 'react';
import { AccountContentPanel, AccountTaskList } from '@/components';
import { ContentProps, TaskListProps } from '@/types';
import { useTranslations } from 'next-intl';

export const UserTaskSection = ({ tasks }: TaskListProps): JSX.Element => {
  const t = useTranslations('account');
  const views = t.raw('tasksSection') as ContentProps[];

  const viewComponents: Record<string, React.ReactNode> = {
    tasksCreated: <AccountTaskList tasks={tasks} />,
    tasksCompleted: <AccountTaskList tasks={tasks} />,
    tasksInProgress: <AccountTaskList tasks={tasks} />,
  };

  return <AccountContentPanel views={views} viewComponents={viewComponents} />;
};
