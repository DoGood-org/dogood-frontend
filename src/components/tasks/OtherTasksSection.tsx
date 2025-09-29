'use client';

import {
  generateMockTasks,
  generateTasks,
} from '@/components/main/map/mockTasks';
import { IExtendedITaskProps } from '@/types/tasks.type';
import { TaskItem } from '../main/map/tasksPanel/TaskItem';

type Props = {
  tasks: IExtendedITaskProps[];
  className?: string;
};

export const OtherTasksSection: React.FC<Props> = ({ tasks }) => {
  const displayedTasks =
    tasks.length > 0
      ? tasks
      : generateMockTasks(generateTasks(49.8429, 24.0316));
  return (
    <section>
      <h2 className="text-h3 mb-6">Other Tasks</h2>
      <div
        className={
          'flex flex-wrap w-full lg:h-[722px] flex-1 overflow-y-scroll custom-scrollbar-tasks'
        }
      >
        {displayedTasks.map((task) => (
          <TaskItem key={task.id} {...task} />
        ))}
      </div>
    </section>
  );
};
