'use client';

import { generateMockTasks, generateTasks } from '../main/map/mockTasks';
import { Container } from '../ui/Container';
import { Task } from './Task';
import { ITaskDetails } from '@/types/tasks.type';
import { IconButtonGroup } from '@/components/tasks/ButtonGroup/IconButtonGroup';

interface TaskContentProps {
  slug: string;
}

export const TaskContent: React.FC<TaskContentProps> = ({ slug }) => {
  const tasks = generateTasks(49.8429, 24.0316);
  const detailedTasks: ITaskDetails[] = generateMockTasks(tasks);

  const task = detailedTasks.find((t) => t.id === slug);

  if (!task) return <div>Task not found</div>;

  return (
    <Container className="py-10">
      <Task task={task} />
      <IconButtonGroup categories={task.category} distance={task.distance} />
    </Container>
  );
};
