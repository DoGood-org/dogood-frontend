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
import { useMemo } from 'react';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { transformBackendTaskToITaskDetails } from '@/utils/taskTransform';

interface TaskContentProps {
  slug: string;
  newsItems: INewsItem[];
}

export const TaskContent: React.FC<TaskContentProps> = ({
  slug,
  newsItems,
}) => {
  const currentUser = authStore((state) => state.user);
  const t = useTranslations('tasks');
  const storeTasks = useTaskStore((state) => state.tasks);

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

  if (!task) return <div>{t('task.notFound')}</div>;

  const {
    id: taskId,
    category,
    userParticipationStatus,
    status: taskStatus,
  } = task;

  const isHost =
    currentUser && task.host?.type === 'USER'
      ? String(task.host.userId) === String(currentUser.id)
      : false;
  return (
    <Container className="py-10">
      <Task task={task} />
      <IconButtonGroup
        categories={category}
        location={task.location}
        taskId={taskId}
      />
      <div className="flex justify-between mt-5">
        <TaskControlButtons
          taskId={taskId}
          actionType={task.actionType}
          userParticipationStatus={userParticipationStatus}
          taskStatus={taskStatus}
          isHost={isHost}
        />
      </div>
      <OtherTasksSection tasks={otherTasksList} />
      <LastNews newsItems={newsItems} />
    </Container>
  );
};
