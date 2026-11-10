'use client';

import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { JSX, useEffect, useState } from 'react';
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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    useCreateTaskStore.setState({ isSuccess: false });
  }, []);

  useEffect(() => {
    useCreateTaskStore.setState({
      currentUser: initialUser,
      organizations: initialOrganizations,
    });
    setReady(true);
  }, [initialUser, initialOrganizations]);

  if (!ready) return <></>;

  return (
    <StripeProviderLazy>
      <CreateTaskForm>
        <CreateTask />
      </CreateTaskForm>
    </StripeProviderLazy>
  );
};

export default CreateTaskPage;
