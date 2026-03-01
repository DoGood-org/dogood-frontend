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

export const CreateTask = ({
  currentUserName,
  currentUserId,
}: CreateTaskProp): JSX.Element | null => {
  const step = useCreateTaskStore((s) => s.createStep);
  const isSuccess = useCreateTaskStore((s) => s.isSuccess);

  if (isSuccess) {
    return <CreateTaskSuccess />;
  }

  if (step === 0) {
    return (
      <Step0TaskOwner
        organizations={mockOrganizations}
        currentUserName={currentUserName}
        currentUserId={currentUserId}
      />
    );
  }

  const StepComponent = CREATE_TASK_STEPS[step - 1]?.component;
  if (!StepComponent) return null;

  return <StepComponent />;
};
