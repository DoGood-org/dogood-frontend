'use client';

import { Button } from '@/components/ui/Button';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { cn } from '@/lib/utils';
// import { MarkerCategoryEnum } from '@/types';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { JSX } from 'react';

type Props = {
  showBack?: boolean;
};
export const BackNextButtons = ({ showBack = true }: Props): JSX.Element => {
  const createStep = useTaskStore((s) => s.createStep);
  const prevCreateStep = useTaskStore((s) => s.prevCreateStep);
  const nextCreateStep = useTaskStore((s) => s.nextCreateStep);

  // const category = useTaskStore((s) => s.createTaskDraft.category);

  // const isDonation = Array.isArray(category)
  //   ? category.includes(MarkerCategoryEnum.Donation)
  //   : category === MarkerCategoryEnum.Donation;

  const lastStepIndex = CREATE_TASK_STEPS.length - 1;

  const isLastStep = createStep === lastStepIndex;
  const isBeforeLastStep = createStep === lastStepIndex - 1;

  const showLeftButton = showBack && createStep > 0;
  const leftButtonText = isLastStep ? 'Edit' : 'Go back';

  const rightButtonText = isLastStep
    ? 'Confirm'
    : isBeforeLastStep
      ? 'Preview'
      : 'Next step';

  const handleNextClick = (): void => {
    if (isLastStep) {
      console.log('Task submitted for moderation');
    }
    nextCreateStep();
  };

  const containerClass = (isLastStep: boolean): string =>
    cn(
      'flex w-full justify-center md:justify-end gap-3',
      isLastStep && 'md:gap-12'
    );

  const baseButtonClass = 'flex-1 md:flex-none';

  const backButtonClass = (isLastStep: boolean): string =>
    cn(
      baseButtonClass,
      'hover:border',
      isLastStep
        ? 'md:min-w-[156px] py-4 px-10 text-base'
        : 'md:min-w-[114px] py-3 px-6'
    );

  const nextButtonClass = (isLastStep: boolean): string =>
    cn(
      baseButtonClass,
      isLastStep
        ? 'md:min-w-[156px] py-4 px-10 text-base'
        : 'md:min-w-[114px] py-3 px-6'
    );

  return (
    <div className={containerClass(isLastStep)}>
      {showLeftButton && (
        <Button
          variant="secondary"
          className={backButtonClass(isLastStep)}
          onClick={prevCreateStep}
          size="lg"
        >
          {leftButtonText}
        </Button>
      )}
      <Button
        variant="primary"
        size="lg"
        className={nextButtonClass(isLastStep)}
        onClick={handleNextClick}
      >
        {rightButtonText}
      </Button>
    </div>
  );
};
