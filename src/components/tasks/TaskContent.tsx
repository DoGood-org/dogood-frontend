'use client';

import { generateMockTasks, generateTasks } from '../main/map/mockTasks';
import { Container } from '../ui/Container';
import { Task } from './Task';
import {
  ITaskDetails,
  TaskActionType,
  UserParticipationStatus,
} from '@/types/tasks.type';
import { IconButtonGroup } from '@/components/tasks/ButtonGroup/IconButtonGroup';
import { TaskActionButtons } from '@/components';

interface TaskContentProps {
  slug: string;
}

export const TaskContent: React.FC<TaskContentProps> = ({ slug }) => {
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

  if (!task) return <div>Task not found</div>;

  const {
    category,
    distance,
    id: taskId,
    actionType,
    userParticipationStatus,
  } = task;

  return (
    <Container className="py-10">
      <Task task={task} />
      <IconButtonGroup categories={category} distance={distance} />
      <div className="flex justify-between mb-6 mt-6">
        <TaskActionButtons
          taskId={taskId}
          actionType={actionType}
          userParticipationStatus={userParticipationStatus}
        />
      </div>
    </Container>
  );
};
