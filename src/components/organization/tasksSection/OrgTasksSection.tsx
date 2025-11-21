'use client';

import { Button, EmptyContent, Slider, TaskFilter } from '@/components';
import { Plus } from '@/components/icons';
import { isAdminOrModerator, Role } from '@/lib/getUserRole';
import { TaskProps } from '@/types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { JSX, useEffect, useState } from 'react';
import OrgTaskItem from './OrgTaskItem';
import { useMediaQuery } from '@/hooks';
import { useOrgSectionTitle } from '@/hooks/useOrgSectionTitle';

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
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1439px)');

  const adminRole = isAdminOrModerator(role);

  const title = useOrgSectionTitle(role, 'tasks');

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
        <Slider
          items={filteredTasks}
          itemsPerSlide={6}
          listClassName={
            isMobile
              ? 'flex flex-col gap-5'
              : isTablet
                ? 'grid grid-cols-2 gap-5'
                : 'grid grid-cols-3 gap-5'
          }
          itemClassName="p-0"
          renderItem={(task, idx) => (
            <OrgTaskItem key={`${idx}-${task.title}`} task={task} />
          )}
        />
      )}
    </>
  );
};
