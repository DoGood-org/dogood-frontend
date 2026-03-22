'use client';

import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { JSX } from 'react';
import { CreateTaskSuccess } from './CreateTaskSuccess';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';

export const CreateTask = (): JSX.Element | null => {
  const step = useCreateTaskStore((s) => s.createStep);
  const isSuccess = useCreateTaskStore((s) => s.isSuccess);
  const currentUser = useCreateTaskStore((s) => s.currentUser);
  const organizations = useCreateTaskStore((s) => s.organizations);

  if (isSuccess) {
    return <CreateTaskSuccess />;
  }

  const StepComponent = CREATE_TASK_STEPS.find((s) => s.id === step)?.component;
  if (!StepComponent) return null;

  return (
    <StepComponent currentUser={currentUser} organizations={organizations} />
  );
};
