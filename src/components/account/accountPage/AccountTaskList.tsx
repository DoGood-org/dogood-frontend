'use client';

import { TaskListProps } from '@/types';
import { JSX, useEffect, useState } from 'react';
import { useRouteMatch } from '@/hooks/useRouteMatch';
import { TaskFilter } from '@/components/ui/TaskFilter';
import { Slider } from '@/components/ui/Slider';
import { NoTask } from '@/components/account/accountPage/NoTask';
import { AccountTaskItem } from '@/components/account/accountPage/AccountTaskItem';

export const AccountTaskList = ({ tasks }: TaskListProps): JSX.Element => {
  const [filter, setFilter] = useState('ALL');
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const isAccountPage = useRouteMatch('/account');

  useEffect(() => {
    if (filter === 'ALL') {
      setFilteredTasks(tasks);
    } else {
      const newTasks = tasks?.filter((task) => task.status === filter);
      setFilteredTasks(newTasks);
    }
  }, [setFilteredTasks, filter, tasks]);

  if (!tasks || tasks.length === 0) {
    return <NoTask />;
  }

  return (
    <>
      {isAccountPage && (
        <TaskFilter onChange={(status) => setFilter(status)} role="ADMIN" />
      )}
      {filteredTasks?.length ? (
        <Slider
          items={filteredTasks}
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
