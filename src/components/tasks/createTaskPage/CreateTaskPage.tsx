'use client';

import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { JSX, useEffect, useState } from 'react';
import { HostUser, OrganizationFromBack } from '@/types/tasks.type';
import { StripeProviderLazy } from '@/components/providers/StripeProviderLazy';
import { CreateTaskForm } from './CreateTaskForm';
import { CreateTask } from './CreateTask';

import { getTaskByIdService } from '@/services/taskService';
import { mapTaskToFormValues } from '@/utils/taskTransform';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  initialUser: HostUser;
  initialOrganizations: OrganizationFromBack[];
}

const CreateTaskPage = ({
  initialUser,
  initialOrganizations,
}: Props): JSX.Element => {
  const [ready, setReady] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get('edit');

  const editingTaskId = useCreateTaskStore((s) => s.editingTaskId);
  const hasHydrated = useCreateTaskStore((s) => s.hasHydrated);

  useEffect(() => {
    useCreateTaskStore.setState({
      currentUser: initialUser,
      organizations: initialOrganizations,
    });
  }, [initialUser, initialOrganizations]);

  useEffect(() => {
    if (!hasHydrated) return;

    let cancelled = false;

    const initialize = async (): Promise<void> => {
      const store = useCreateTaskStore.getState();
      useCreateTaskStore.setState({ isSuccess: false });

      if (!editId) {
        if (store.editingTaskId) store.resetCreateTask();
        setReady(true);
        return;
      }

      if (store.editingTaskId === editId) {
        setReady(true);
        return;
      }

      setReady(false);
      const response = await getTaskByIdService(editId);
      if (cancelled) return;

      if (!response.ok) {
        router.replace('/tasks');
        return;
      }

      const task = response.data.data.task;
      useCreateTaskStore
        .getState()
        .startEditTask(task.id, mapTaskToFormValues(task));
      setReady(true);
    };

    initialize();

    return (): void => {
      cancelled = true;
    };
  }, [editId, router, hasHydrated]);

  useEffect(() => {
    return (): void => {
      const state = useCreateTaskStore.getState();
      if (state.editingTaskId || state.isSuccess) state.resetCreateTask();
    };
  }, []);

  const isStoreCleanForCreate = editId ? true : !editingTaskId;

  if (!ready || !isStoreCleanForCreate) return <></>;

  return (
    <StripeProviderLazy>
      <CreateTaskForm>
        <CreateTask />
      </CreateTaskForm>
    </StripeProviderLazy>
  );
};

export default CreateTaskPage;
