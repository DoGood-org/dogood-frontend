'use client';

import dynamic from 'next/dynamic';
import { Spinner } from '@/components/ui/Spinner';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { JSX, useEffect } from 'react';
import { HostUser, OrganizationFromBack } from '@/types/tasks.type';

const StripeProviderLazy = dynamic(
  () =>
    import('@/components/providers/StripeProviderLazy').then(
      (mod) => mod.StripeProviderLazy
    ),
  { ssr: false }
);
const CreateTaskForm = dynamic(
  () =>
    import('@/components/tasks/createTaskPage/CreateTaskForm').then(
      (mod) => mod.CreateTaskForm
    ),
  { ssr: false }
);
const CreateTask = dynamic(
  () =>
    import('@/components/tasks/createTaskPage/CreateTask').then(
      (mod) => mod.CreateTask
    ),
  { ssr: false }
);

interface Props {
  initialUser: HostUser;
  initialOrganizations: OrganizationFromBack[];
}

const CreateTaskPage = ({
  initialUser,
  initialOrganizations,
}: Props): JSX.Element => {
  const hasHydrated = useCreateTaskStore((s) => s.hasHydrated);

  useEffect(() => {
    useCreateTaskStore.setState({
      currentUser: initialUser,
      organizations: initialOrganizations,
    });
  }, [initialOrganizations, initialUser]);

  if (!hasHydrated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <StripeProviderLazy>
      <CreateTaskForm>
        <CreateTask />
      </CreateTaskForm>
    </StripeProviderLazy>
  );
};

export default CreateTaskPage;
