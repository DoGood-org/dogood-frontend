'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { JSX, useState } from 'react';
import { RequiredFieldsModal } from '../RequiredFieldsModal/RequiredFieldsModal';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { TaskCategoryEnum } from '@/types/createTask.type';

type Props = {
  showBack?: boolean;
};
export const BackNextButtons = ({ showBack = true }: Props): JSX.Element => {
  const createStep = useCreateTaskStore((s) => s.createStep);
  const prevCreateStep = useCreateTaskStore((s) => s.prevCreateStep);
  const nextCreateStep = useCreateTaskStore((s) => s.nextCreateStep);
  const setIsSuccess = useCreateTaskStore((s) => s.setIsSuccess);

  const [isRequiredModalOpen, setIsRequiredModalOpen] = useState(false);

  const category = useCreateTaskStore((s) => s.createTaskDraft.category);
  const isDonation = Array.isArray(category)
    ? category.includes(TaskCategoryEnum.Donation)
    : category === TaskCategoryEnum.Donation;

  const lastStepIndex = isDonation ? 5 : 4;

  const isLastStep = createStep === lastStepIndex;

  const isBeforeLastStep = createStep === lastStepIndex - 1;

  const showLeftButton = showBack && createStep > 0;
  const leftButtonText = isLastStep ? 'Edit' : 'Go back';

  const rightButtonText = isLastStep
    ? 'Confirm'
    : isBeforeLastStep
      ? 'Preview'
      : 'Next step';

  // Тут можна додати реальну валідацію полів
  const isFormValid = true;

  const handleNextClick = (): void => {
    if (!isFormValid) {
      setIsRequiredModalOpen(true);
      return;
    }

    if (isLastStep) {
      // Тут можна викликати функцію відправки даних на сервер
      setIsSuccess(true);
      return;
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
