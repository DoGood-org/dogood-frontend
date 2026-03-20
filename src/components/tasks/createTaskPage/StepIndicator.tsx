'use client';

import { JSX, useMemo } from 'react';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { isDonationCategory } from '@/utils/isDonationCategory';
import { STEP_IDS } from '@/constants/stepIds';

export const StepIndicator = (): JSX.Element => {
  const currentStep = useCreateTaskStore((state) => state.createStep);
  const formValues = useCreateTaskStore((state) => state.createTaskDraft);

  const isDonation = useMemo(() => {
    return (
      isDonationCategory(formValues?.category) || Number(formValues?.amount) > 0
    );
  }, [formValues?.category, formValues?.amount]);

  const steps = useMemo(
    () => CREATE_TASK_STEPS.filter((s) => s.id !== STEP_IDS.OWNER),
    []
  );

  if (currentStep === STEP_IDS.OWNER) return <div className="h-1.5" />;

  let activeIndex = steps.findIndex((s) => s.id === currentStep);

  if (!isDonation && currentStep === STEP_IDS.PREVIEW) {
    activeIndex = steps.findIndex((s) => s.id === STEP_IDS.PAYMENT);
  }

  return (
    <div className="w-full flex justify-center items-center gap-2">
      {steps.map((step, index) => {
        const isActive = index === activeIndex;

        return (
          <span
            key={step.id}
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
