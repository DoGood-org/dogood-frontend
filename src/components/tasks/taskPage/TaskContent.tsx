'use client';

import { IconButtonGroup } from '@/components/tasks/taskPage/ButtonGroup/IconButtonGroup';
import { LastNews } from '@/components/tasks/taskPage/LastNews/LastNews';
import { INewsItem } from '@/types';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { TaskControlButtons } from './ButtonGroup/TaskControlButtons';
import { OtherTasksSection } from './OtherTasks/OtherTasksSection';
import { Task } from './Task';
import { useEffect, useMemo, useState } from 'react';
import { transformBackendTaskToITaskDetails } from '@/utils/taskTransform';
import { Spinner } from '@/components/ui/Spinner';
import type { ITaskDetails, TaskStatus } from '@/types/tasks.type';
import {
  getAllTasksService,
  getTaskByIdService,
  IGetAllTasksResponse,
  IGetTaskByIdResponse,
  ITaskApi,
} from '@/services/taskService';
import { authStore } from '@/zustand/stores/authStore';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { isAdminOrModerator } from '@/lib/getUserRole';

const NOT_FOUND = 'not-found';

interface TaskContentProps {
  slug: string;
  newsItems: INewsItem[];
}

const safeTransform = (raw?: ITaskApi): ITaskDetails | null => {
  if (!raw || typeof raw !== 'object' || !raw.id) return null;
  try {
    return transformBackendTaskToITaskDetails({ task: raw });
  } catch (err) {
    console.error('Failed to transform task', err, raw);
    return null;
  }
};

export const TaskContent: React.FC<TaskContentProps> = ({
  slug,
  newsItems,
}) => {
  const t = useTranslations('tasks');

  const isLoggedIn = authStore((s) => s.isLoggedIn);
  const user = authStore((s) => s.user);

  const [task, setTask] = useState<ITaskDetails | null>(null);
  const [otherTasks, setOtherTasks] = useState<ITaskDetails[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [listError, setListError] = useState<string | null>(null);

  const handleStatusChange = (status: TaskStatus): void => {
    setTask((prev) => (prev ? { ...prev, status } : prev));
  };

  useEffect(() => {
    let cancelled = false;

    const load = async (): Promise<void> => {
      setIsFetching(true);
      setFetchError(null);
      setListError(null);
      setTask(null);
      setOtherTasks([]);

      const [singleRes, listRes] = await Promise.all([
        getTaskByIdService(slug),
        getAllTasksService(),
      ]);

      if (cancelled) return;

      let parsedTask: ITaskDetails | null = null;
      let parsedList: ITaskDetails[] = [];

      // ---- Single task ----
      if (!singleRes.ok) {
        setFetchError(singleRes.errorMessage);
      } else {
        const raw = (singleRes.data as IGetTaskByIdResponse | undefined)?.data
          ?.task;
        parsedTask = safeTransform(raw);

        if (parsedTask) {
          setTask(parsedTask);
        } else {
          setFetchError(NOT_FOUND);
        }
      }

      // ---- All tasks ----
      if (!listRes.ok) {
        setListError(listRes.errorMessage);
      } else {
        const rawList =
          (listRes.data as IGetAllTasksResponse | undefined)?.data?.tasks ?? [];

        parsedList = rawList
          .map((raw) => safeTransform(raw))
          .filter((item): item is ITaskDetails => item !== null)
          .filter((item) => String(item.id) !== String(slug));

        setOtherTasks(parsedList);
      }

      useTaskStore.getState().upsertTasks(
        [...(parsedTask ? [parsedTask] : []), ...parsedList].map((item) => ({
          ...item,
          distance: '',
        }))
      );

      setIsFetching(false);
    };

    load();

    return (): void => {
      cancelled = true;
    };
  }, [slug]);

  const isHost = useMemo(() => {
    if (!task?.host || !user) return false;

    if (task.host.type === 'USER') {
      return String(task.host.user?.id) === String(user.id);
    }

    const taskOrgId = String(task.host.organization?.id);
    return (user.organizations ?? []).some(
      (org) =>
        String(org.id) === taskOrgId &&
        !!org.role &&
        isAdminOrModerator(org.role)
    );
  }, [task, user]);

  if (isFetching) {
    return (
      <Container className="py-10 flex justify-center items-center">
        <Spinner />
      </Container>
    );
  }

  if (!task) {
    return (
      <Container className="py-10 flex justify-center items-center">
        <span>{fetchError ?? t('task.notFound')}</span>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <Task task={task} isHost={isHost} />
      <IconButtonGroup
        categories={task.category}
        location={task.location}
        taskId={task.id}
        showFavorite={isLoggedIn}
        redirectToMap
      />
      <div className="flex justify-between mt-5">
        <TaskControlButtons
          taskId={task.id}
          categories={task.category}
          taskStatus={task.status}
          isHost={isHost}
          onStatusChange={handleStatusChange}
        />
      </div>

      {listError ? null : <OtherTasksSection tasks={otherTasks} />}
      <LastNews newsItems={newsItems} />
    </Container>
  );
};
