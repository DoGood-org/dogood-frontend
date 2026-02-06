'use client';

import { Spinner } from '@/components/ui/Spinner';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { JSX } from 'react';
import { Step0TaskOwner } from './steps/Step0TaskOwner/Step0TaskOwner';
import { OrganizationFromBack } from '@/types/tasks.type';
import { CreateTaskSuccess } from './CreateTaskSuccess';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';

interface CreateTaskProp {
  organizations: OrganizationFromBack[];
  currentUserName: string;
}

export const CreateTask = ({
  organizations,
  currentUserName,
}: CreateTaskProp): JSX.Element | null => {
  const step = useCreateTaskStore((s) => s.createStep);
  const isSuccess = useCreateTaskStore((s) => s.isSuccess);
  const hasHydrated = useCreateTaskStore((s) => s.hasHydrated);

  if (!hasHydrated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (isSuccess) {
    return <CreateTaskSuccess />;
  }

  if (step === 0) {
    return (
      <Step0TaskOwner
        organizations={organizations}
        currentUserName={currentUserName}
      />
    );
  }

  const StepComponent = CREATE_TASK_STEPS[step - 1]?.component;
  if (!StepComponent) return null;

  return <StepComponent />;
};
