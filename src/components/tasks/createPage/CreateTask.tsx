'use client';

import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { JSX } from 'react';
import { CreateTaskSuccess } from './CreateTaskSuccess';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { CreateTaskProp } from '@/types/createTask.type';

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

  const StepComponent = CREATE_TASK_STEPS.find((s) => s.id === step)?.component;
  if (!StepComponent) return null;

  return (
    <StepComponent
      organizations={organizations}
      currentUserId={currentUserId}
      currentUserName={currentUserName}
    />
  );
};
