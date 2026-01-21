'use client';

import { Spinner } from '@/components/ui/Spinner';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { JSX, useEffect, useState } from 'react';

export const CreateTask = (): JSX.Element | null => {
  const step = useTaskStore((s) => s.createStep);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const StepComponent = CREATE_TASK_STEPS[step]?.component;
  if (!StepComponent) return null;

  return <StepComponent />;
};
