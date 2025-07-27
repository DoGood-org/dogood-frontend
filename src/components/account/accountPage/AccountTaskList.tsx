import { TaskProps } from '@/types';
import { JSX } from 'react';
import userData from './user.json';
import { Slider, NoTask, AccountTaskItem } from '@/components';

export const AccountTaskList = (): JSX.Element => {
  const tasks = userData.joinedTasks as TaskProps[];

  return (
    <>
      {tasks.length > 0 ? (
        <Slider
          items={tasks}
          itemsPerSlide={2}
          renderItem={(task, idx) => (
            <AccountTaskItem key={`${idx}-${task.title}`} task={task} />
          )}
        />
      ) : (
        <NoTask />
      )}
    </>
  );
};
