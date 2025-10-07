import { TaskListProps } from '@/types';
import { JSX } from 'react';
import { Slider, NoTask, AccountTaskItem } from '@/components';

export const AccountTaskList = ({ tasks }: TaskListProps): JSX.Element => {
  if (!tasks || tasks.length === 0) {
    return <NoTask />;
  }

  return (
    <Slider
      items={tasks}
      itemsPerSlide={2}
      renderItem={(task, idx) => (
        <AccountTaskItem key={`${idx}-${task.title}`} task={task} />
      )}
    />
  );
};
