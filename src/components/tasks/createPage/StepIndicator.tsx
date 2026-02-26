'use client';

import { JSX, useMemo } from 'react';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { TaskCategoryEnum } from '@/types/createTask.type';

export const StepIndicator = (): JSX.Element => {
  const currentStep = useCreateTaskStore((state) => state.createStep);
  const formValues = useCreateTaskStore((state) => state.createTaskDraft);

  const isDonation = useMemo(() => {
    return (
      (formValues?.category ?? []).includes(TaskCategoryEnum.Donation) ||
      Number(formValues?.amount) > 0
    );
  }, [formValues]);

  const visualStep = isDonation ? currentStep : Math.min(currentStep, 4);

  return (
    <div className="w-full flex justify-center items-center gap-2">
      {CREATE_TASK_STEPS.map((_, index) => {
        const stepNumber = index + 1;

        const isActive =
          stepNumber < 5
            ? stepNumber === visualStep
            : stepNumber === 5 && isDonation && currentStep === 5;

        return (
          <span
            key={index}
            className={`
              h-1.5 rounded-full transition-all duration-300
              ${isActive ? 'bg-[#00c1ac] w-16' : 'bg-text-gray w-8'}
            `}
          />
        );
      })}
    </div>
  );
};
