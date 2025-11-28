'use client';

import { generateMockTasks, generateTasks } from '../main/map/mockTasks';
import { Container } from '../ui/Container';
import { Task } from '@/components/tasks/Task';
import {
  ITaskDetails,
  TaskActionType,
  UserParticipationStatus,
} from '@/types/tasks.type';
import { IconButtonGroup } from '@/components/tasks/ButtonGroup/IconButtonGroup';
import { Button, OtherTasksSection, TaskActionButtons } from '@/components';
import { LastNews } from './LastNews/LastNews';
import { INewsItem } from '@/types';
import { useTranslations } from 'next-intl';

interface TaskContentProps {
  slug: string;
  newsItems: INewsItem[];
}

export const TaskContent: React.FC<TaskContentProps> = ({
  slug,
  newsItems,
}) => {
  const t = useTranslations('tasks');
  const tasks = generateTasks(49.8429, 24.0316);
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

  const {
    category,
    distance,
    id: taskId,
    actionType,
    userParticipationStatus,
  } = task;

  const taskStatus = 'IN_PROGRESS';
  const isHost = true;
  return (
    <Container className="py-10">
      <Task task={task} />
      <IconButtonGroup
        categories={category}
        distance={distance}
        lat={task.lat}
        lng={task.lng}
        taskId={taskId}
      />
      <div className="flex justify-between mb-6 mt-6">
        <TaskActionButtons
          taskId={taskId}
          actionType={actionType}
          userParticipationStatus={userParticipationStatus}
          taskStatus={taskStatus}
          isHost={isHost}
          className="w-[152px]"
        />
        {isHost && (
          <div className="flex space-x-2">
            <Button variant="secondary" onClick={() => {}}>
              Close this task
            </Button>
            <Button variant="primary" onClick={() => {}}>
              Mark as finished
            </Button>
          </div>
        )}
      </div>
      <OtherTasksSection tasks={otherTasksList} />
      <LastNews newsItems={newsItems} />
    </Container>
  );
};
