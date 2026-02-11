'use client';

import { JSX } from 'react';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';

export const StepIndicator = (): JSX.Element => {
  const currentStep = useCreateTaskStore((state) => state.createStep);

  return (
    <div className="w-full flex justify-center items-center gap-2">
      {CREATE_TASK_STEPS.map((_, index) => {
        const isActive = index + 1 === currentStep;

        return (
          <span
            key={index}
            className={`
              h-1.5 rounded-full transition-all duration-300
              ${isActive ? 'bg-[#00c1ac] w-16 h-1.5' : 'bg-text-gray w-8 h-1.5'}
            `}
          />
        );
      })}
    </div>
  );
};
