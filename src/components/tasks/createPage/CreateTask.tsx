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

export const CreateTask = ({
  currentUserName,
  currentUserId,
  organizations,
}: CreateTaskProp): JSX.Element | null => {
  const step = useCreateTaskStore((s) => s.createStep);
  const isSuccess = useCreateTaskStore((s) => s.isSuccess);

  if (isSuccess) {
    return <CreateTaskSuccess />;
  }

  if (step === 0) {
    return (
      <Step0TaskOwner
        organizations={organizations}
        currentUserName={currentUserName}
        currentUserId={currentUserId}
      />
    );
  }

  const StepComponent = CREATE_TASK_STEPS[step - 1]
    ?.component as React.FC<CreateTaskProp>;
  if (!StepComponent) return null;

  return (
    <StepComponent
      organizations={organizations}
      currentUserId={currentUserId}
      currentUserName={currentUserName}
    />
  );
};
