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
import { OtherTasksSection, TaskActionButtons } from '@/components';
import { LastNews } from './LastNews/LastNews';

interface TaskContentProps {
  slug: string;
}

const mockNews = [
  {
    id: 1,
    title: 'Перша новина',
    createdAt: new Date().toISOString(),
    image: '/images/news1.jpg',
    category: 'Events',
    tags: ['volunteering', 'community'],
    content: 'Короткий опис новини або статті...',
  },
  {
    id: 2,
    title: 'Друга новина',
    createdAt: new Date().toISOString(),
    image: '/images/news2.jpg',
    category: 'Fundraising',
    tags: ['donation'],
    content: 'Ще одна тестова новина...',
  },
  {
    id: 3,
    title: 'Перша новина',
    createdAt: new Date().toISOString(),
    image: '/images/news1.jpg',
    category: 'Events',
    tags: ['volunteering', 'community'],
    content: 'Короткий опис новини або статті...',
  },
  {
    id: 4,
    title: 'Друга новина',
    createdAt: new Date().toISOString(),
    image: '/images/news2.jpg',
    category: 'Fundraising',
    tags: ['donation'],
    content: 'Ще одна тестова новина...',
  },
  {
    id: 5,
    title: 'Перша новина',
    createdAt: new Date().toISOString(),
    image: '/images/news1.jpg',
    category: 'Events',
    tags: ['volunteering', 'community'],
    content: 'Короткий опис новини або статті...',
  },
  {
    id: 6,
    title: 'Друга новина',
    createdAt: new Date().toISOString(),
    image: '/images/news2.jpg',
    category: 'Fundraising',
    tags: ['donation'],
    content: 'Ще одна тестова новина...',
  },
];

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

  const otherTasksList: ITaskDetails[] = detailedTasks;

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
          className="w-[152px]"
        />
      </div>
      <OtherTasksSection tasks={otherTasksList} />
      <LastNews newsItems={mockNews} />
    </Container>
  );
};
