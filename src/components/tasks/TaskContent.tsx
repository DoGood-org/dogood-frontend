'use client';

import { generateMockTasks, generateTasks } from '../main/map/mockTasks';
import { Container } from '../ui/Container';
import { Task } from './Task';
import { ITaskDetails } from '@/types/tasks.type';

interface TaskContentProps {
  slug: string;
}

export const TaskContent: React.FC<TaskContentProps> = ({ slug }) => {
  const tasks = generateTasks(49.8429, 24.0316);
  const detailedTasks: ITaskDetails[] = generateMockTasks(tasks);
  console.log('detailedTasks', detailedTasks);

  const task = detailedTasks.find((t) => t.id === slug) ?? detailedTasks[0];
  return (
    <Container className="py-10">
      <Task task={task} />
    </Container>
  );
};
