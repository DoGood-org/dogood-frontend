'use client';

import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { JSX, useEffect } from 'react';
import { HostUser, OrganizationFromBack } from '@/types/tasks.type';
import { StripeProviderLazy } from '@/components/providers/StripeProviderLazy';
import { CreateTaskForm } from './CreateTaskForm';
import { CreateTask } from './CreateTask';

interface Props {
  initialUser: HostUser;
  initialOrganizations: OrganizationFromBack[];
}

const CreateTaskPage = ({
  initialUser,
  initialOrganizations,
}: Props): JSX.Element => {
  useEffect(() => {
    useCreateTaskStore.setState({
      currentUser: initialUser,
      organizations: initialOrganizations,
      isSuccess: false,
    });
  }, [initialUser, initialOrganizations]);

  return (
    <StripeProviderLazy>
      <CreateTaskForm>
        <CreateTask />
      </CreateTaskForm>
    </StripeProviderLazy>
  );
};

export default CreateTaskPage;
