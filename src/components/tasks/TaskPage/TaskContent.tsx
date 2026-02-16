'use client';

import { generateMockTasks, generateTasks } from '../../main/map/mockTasks';
import {
  ITaskDetails,
  TaskActionType,
  TaskStatus,
  UserParticipationStatus,
} from '@/types/tasks.type';
import { IconButtonGroup } from '@/components/tasks/taskPage/ButtonGroup/IconButtonGroup';
import { LastNews } from '@/components/tasks/taskPage/LastNews/LastNews';
import { INewsItem } from '@/types';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { TaskControlButtons } from './ButtonGroup/TaskControlButtons';
import { OtherTasksSection } from './OtherTasks/OtherTasksSection';
import { authStore } from '@/zustand/stores/authStore';
import { Task } from './Task';

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
  const tasks = generateTasks(0, 0);
  const detailedTasks: ITaskDetails[] = generateMockTasks(tasks).map(
    (task) => ({
      ...task,
      actionType:
        task.id === 'task-0'
          ? TaskActionType.FUNDRAISING
          : TaskActionType.VOLUNTEERING,
      userParticipationStatus:
        task.id === 'task-1'
          ? UserParticipationStatus.JOINED
          : UserParticipationStatus.NONE,
    })
  );

  const task = detailedTasks.find((t) => t.id === slug);

  if (!task) return <div>{t('task.notFound')}</div>;

  const otherTasksList: ITaskDetails[] = detailedTasks;

  const { category, distance, id: taskId, userParticipationStatus } = task;

  const taskStatus = TaskStatus.IN_PROGRESS;

  const isHost =
    currentUser != null && task.host?.id !== undefined
      ? String(task.host.id) === String(currentUser.id)
      : false;

  return (
    <Container className="py-10">
      <Task task={task} />
      <IconButtonGroup
        categories={category}
        location={task.location}
        distance={distance}
        lat={task.lat}
        lng={task.lng}
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
