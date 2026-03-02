'use client';

import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { JSX } from 'react';
import { Step0TaskOwner } from './steps/Step0TaskOwner/Step0TaskOwner';
import { OrganizationFromBack } from '@/types/tasks.type';
import { CreateTaskSuccess } from './CreateTaskSuccess';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';

interface CreateTaskProp {
  organizations: OrganizationFromBack[];
  currentUserName: string;
  currentUserId: string;
}

const mockOrganizations: OrganizationFromBack[] = [
  { id: 'org-1', name: 'Charity A', userRole: 'admin' },
  { id: 'org-2', name: 'Helping Hands', userRole: 'moderator' },
  { id: 'org-3', name: 'Animal Care', userRole: 'member' },
];

const mockUser = {
  id: '777',
  name: 'Svitlana Miroshnychenko',
};

export const CreateTask = ({
  currentUserName,
  currentUserId,
}: CreateTaskProp): JSX.Element | null => {
  const step = useCreateTaskStore((s) => s.createStep);
  const isSuccess = useCreateTaskStore((s) => s.isSuccess);

  const finalUserId = currentUserId || mockUser.id;
  const finalUserName = currentUserName || mockUser.name;

  if (isSuccess) {
    return <CreateTaskSuccess />;
  }

  if (step === 0) {
    return (
      <Step0TaskOwner
        organizations={mockOrganizations}
        currentUserName={finalUserName}
        currentUserId={finalUserId}
      />
    );
  }

  const StepComponent = CREATE_TASK_STEPS[step - 1]
    ?.component as React.FC<CreateTaskProp>;
  if (!StepComponent) return null;

  return (
    <StepComponent
      organizations={mockOrganizations}
      currentUserId={finalUserId}
      currentUserName={finalUserName}
    />
  );
};
