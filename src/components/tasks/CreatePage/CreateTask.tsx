'use client';

import { Section } from '@/components/ui/Section';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { JSX } from 'react';

export const CreateTask = (): JSX.Element | null => {
  const step = useTaskStore((s) => s.createStep);

  const StepComponent = CREATE_TASK_STEPS[step]?.component;
  if (!StepComponent) return null;

  return (
    <Section>
      <StepComponent />
    </Section>
  );
};
