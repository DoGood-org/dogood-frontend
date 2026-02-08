'use client';

import { Spinner } from '@/components/ui/Spinner';
import { StripeProviderLazy } from '@/components/providers/StripeProviderLazy';
import { CreateTask } from '@/components/tasks/createPage/CreateTask';
import { CreateTaskForm } from '@/components/tasks/createPage/CreateTaskForm';
import { OrganizationFromBack } from '@/types/tasks.type';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { JSX } from 'react';

interface Props {
  organizations: OrganizationFromBack[];
  currentUserName: string;
}

const CreateTaskPage = ({
  organizations,
  currentUserName,
}: Props): JSX.Element => {
  const hasHydrated = useCreateTaskStore((s) => s.hasHydrated);

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
        <CreateTask
          organizations={organizations}
          currentUserName={currentUserName}
        />
      </CreateTaskForm>
    </StripeProviderLazy>
  );
};

export default CreateTaskPage;
