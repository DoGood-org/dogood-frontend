'use client';

import {
  AccountTaskItem,
  Button,
  EmptyContent,
  TaskFilter,
} from '@/components';
import { Plus } from '@/components/icons';
import { Role } from '@/lib/getUserRole';
import { TaskProps } from '@/types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { JSX, useEffect, useState } from 'react';

export const OrgTasksSection = ({
  tasks,
  role,
}: {
  tasks: TaskProps[];
  role: Role;
}): JSX.Element => {
  const t = useTranslations('organization');
  const [filter, setFilter] = useState('ALL');
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const adminRole = role === 'ADMIN' || role === 'MODERATOR';

  const title = adminRole ? `${t('tasks.title')}` : `${t('tasks.userTitle')}`;

  useEffect(() => {
    if (filter === 'ALL') {
      setFilteredTasks(tasks);
    } else {
      const newTasks = tasks?.filter((task) => task.status === filter);
      setFilteredTasks(newTasks);
    }
  }, [setFilteredTasks, filter, tasks]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-h2-m lg:text-h2">{title}</h2>
        {adminRole && (
          <Button asChild className="gap-2 px-6 py-3 align-right self-end">
            <Link href="/tasks" className="text-white">
              <Plus className="size-5 fill-current" />
              {t('tasks.add')}
            </Link>
          </Button>
        )}
      </div>
      {!!tasks.length && (
        <TaskFilter role={role} onChange={(status) => setFilter(status)} />
      )}

      {!filteredTasks || !filteredTasks.length ? (
        <EmptyContent>{t('noTasks')}</EmptyContent>
      ) : (
        // ---------change this code ------
        <ul className="flex flex-col gap-4">
          {filteredTasks.map((task) => (
            <AccountTaskItem key={task.id} task={task} />
          ))}
        </ul>
        // ----------------------
      )}
    </>
  );
};
