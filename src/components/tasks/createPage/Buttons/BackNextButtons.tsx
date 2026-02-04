'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { JSX, useState } from 'react';
import { RequiredFieldsModal } from '../RequiredFieldsModal/RequiredFieldsModal';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { TaskCategoryEnum } from '@/types/createTask.type';
import { useFormContext } from 'react-hook-form';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';

type Props = {
  showBack?: boolean;
};
export const BackNextButtons = ({ showBack = true }: Props): JSX.Element => {
  const createStep = useCreateTaskStore((s) => s.createStep);
  const prevCreateStep = useCreateTaskStore((s) => s.prevCreateStep);
  const setIsSuccess = useCreateTaskStore((s) => s.setIsSuccess);
  const setCreateStep = useCreateTaskStore((s) => s.setCreateStep);

  const [isRequiredModalOpen, setIsRequiredModalOpen] = useState(false);

  const { trigger, watch } = useFormContext();

  const category = watch('category');

  const isDonation = Array.isArray(category)
    ? category.includes(TaskCategoryEnum.Donation)
    : category === TaskCategoryEnum.Donation;

  const lastStepIndex = isDonation ? 5 : 4;

  const isLastStep = createStep === lastStepIndex;

  const isBeforeLastStep = createStep === lastStepIndex - 1;

  const isActuallyLastStep = isLastStep || (!isDonation && createStep === 3);

  const showLeftButton = showBack && createStep > 0;
  const leftButtonText = isLastStep ? 'Edit' : 'Go back';

  const rightButtonText = isActuallyLastStep
    ? 'Confirm'
    : isBeforeLastStep
      ? 'Preview'
      : 'Next step';

  const handleNextClick = async (): Promise<void> => {
    const stepIndex = createStep === 0 ? null : createStep - 1;

    if (stepIndex !== null) {
      const isValid = await trigger(CREATE_TASK_STEPS[stepIndex].fields);
      if (!isValid) {
        setIsRequiredModalOpen(true);
        return;
      }
    }

    if (isActuallyLastStep) {
      setIsSuccess(true);
    }

    if (isBeforeLastStep) {
      setCreateStep(lastStepIndex);
      return;
    }

    setCreateStep(createStep + 1);
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
    <>
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

      <RequiredFieldsModal
        isOpen={isRequiredModalOpen}
        onClose={() => setIsRequiredModalOpen(false)}
      />
    </>
  );
};
