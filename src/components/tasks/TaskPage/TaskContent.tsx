'use client';

import { IconButtonGroup } from '@/components/tasks/taskPage/ButtonGroup/IconButtonGroup';
import { LastNews } from '@/components/tasks/taskPage/LastNews/LastNews';
import { INewsItem } from '@/types';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { TaskControlButtons } from './ButtonGroup/TaskControlButtons';
import { OtherTasksSection } from './OtherTasks/OtherTasksSection';
import { authStore } from '@/zustand/stores/authStore';
import { Task } from './Task';
import { useEffect, useMemo } from 'react';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { transformBackendTaskToITaskDetails } from '@/utils/taskTransform';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';

interface TaskContentProps {
  slug: string;
  newsItems: INewsItem[];
}

export const TaskContent: React.FC<TaskContentProps> = ({
  slug,
  newsItems,
}) => {
  const currentUser = authStore((state) => state.user);
  const myOrganizations = useCreateTaskStore((state) => state.organizations);
  const storeTasks = useTaskStore((state) => state.tasks);

  useEffect(() => {
    if (currentUser && myOrganizations.length === 0) {
    }
  }, [currentUser, myOrganizations.length]);

  const t = useTranslations('tasks');

  const allDetailedTasks = useMemo(
    () =>
      storeTasks.map((task) => transformBackendTaskToITaskDetails({ task })),
    [storeTasks]
  );

  const task = useMemo(
    () => allDetailedTasks.find((t) => String(t.id) === String(slug)),
    [allDetailedTasks, slug]
  );

  const otherTasksList = useMemo(
    () => allDetailedTasks.filter((t) => String(t.id) !== String(slug)),
    [allDetailedTasks, slug]
  );

  const isHost = useMemo(() => {
    if (!task?.host) return false;

    if (task.host.type === 'USER') {
      if (!currentUser) return false;
      return String(task.host.user?.id) === String(currentUser.id);
    }
    if (task.host.type === 'ORGANIZATION') {
      const taskOrgId = String(task.host.organization?.id);
      return myOrganizations.some((org) => String(org.id) === taskOrgId);
    }

    return false;
  }, [currentUser, task, myOrganizations]);

  if (!task) return <div>{t('task.notFound')}</div>;

  return (
    <Container className="py-10">
      <Task task={task} />
      <IconButtonGroup
        categories={task.category}
        location={task.location}
        taskId={task.id}
      />
      <div className="flex justify-between mt-5">
        <TaskControlButtons
          taskId={task.id}
          categories={task.category}
          taskStatus={task.status}
          isHost={isHost}
        />
      </div>
      <OtherTasksSection tasks={otherTasksList} />
      <LastNews newsItems={newsItems} />
    </Container>
  );
};
