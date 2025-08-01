import { TaskProps } from '@/types';
import { JSX } from 'react';
import { Slider, NoTask, AccountTaskItem } from '@/components';
import { mockUser } from '@/data/mockUser';

export const AccountTaskList = (): JSX.Element => {
  const tasks = mockUser.joinedTasks as TaskProps[];

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
