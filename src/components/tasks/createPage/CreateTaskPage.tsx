'use client';

import { Spinner } from '@/components/ui/Spinner';
import { StripeProviderLazy } from '@/components/providers/StripeProviderLazy';
import { CreateTask } from '@/components/tasks/createPage/CreateTask';
import { CreateTaskForm } from '@/components/tasks/createPage/CreateTaskForm';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { JSX, useRef } from 'react';
import { HostUser, OrganizationFromBack } from '@/types/tasks.type';

interface Props {
  initialUser: HostUser;
  initialOrganizations: OrganizationFromBack[];
}

const CreateTaskPage = ({
  initialUser,
  initialOrganizations,
}: Props): JSX.Element => {
  const hasHydrated = useCreateTaskStore((s) => s.hasHydrated);

  const initializedRef = useRef(false);

  if (!initializedRef.current) {
    useCreateTaskStore.setState({
      currentUser: initialUser,
      organizations: initialOrganizations,
    });

    initializedRef.current = true;
  }

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
