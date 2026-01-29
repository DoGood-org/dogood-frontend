'use client';

import { Spinner } from '@/components/ui/Spinner';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { JSX, useEffect, useState } from 'react';
import { Step0TaskOwner } from './steps/Step0TaskOwner/Step0TaskOwner';
import { OrganizationFromBack } from '@/types/tasks.type';

interface CreateTaskProp {
  organizations: OrganizationFromBack[];
  currentUserName: string;
}

export const CreateTask = ({
  organizations,
  currentUserName,
}: CreateTaskProp): JSX.Element | null => {
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

  if (step === 0) {
    return (
      <Step0TaskOwner
        organizations={organizations}
        currentUserName={currentUserName}
      />
    );
  }

  const StepComponent = CREATE_TASK_STEPS[step]?.component;
  if (!StepComponent) return null;

  return <StepComponent />;
};
