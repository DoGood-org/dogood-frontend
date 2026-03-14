'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { JSX, useState } from 'react';
import { RequiredFieldsModal } from '../RequiredFieldsModal/RequiredFieldsModal';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { useFormContext } from 'react-hook-form';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import {
  BasicInfoFormValues,
  defaultTaskValues,
} from '@/lib/validation/createTask.schema';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { useMapStore } from '@/zustand/stores/mapStore';
import { isDonationCategory } from '@/utils/isDonationCategory';
import { mapCategoryToMarker } from '@/utils/mapCategoryToMarker';
import { mapFormToCreateTask } from '@/utils/taskTransform';
import { STEP_IDS } from '@/constants/stepIds';

type Props = {
  showBack?: boolean;
};

export const BackNextButtons = ({ showBack = true }: Props): JSX.Element => {
  const {
    createStep,
    setIsSuccess,
    resetCreateTask,
    prevCreateStep,
    nextCreateStep,
    setCreateTaskDraft,
    isNextStepPreview,
  } = useCreateTaskStore();

  const organizations = useCreateTaskStore((s) => s.organizations);
  const currentUser = useCreateTaskStore((s) => s.currentUser);

  const addMarker = useMapStore((s) => s.addMarker);

  const [isRequiredModalOpen, setIsRequiredModalOpen] = useState(false);

  const { trigger, watch, reset, setValue, getValues } =
    useFormContext<BasicInfoFormValues>();

  const [category] = watch(['category', 'amount']);

  const hasDonationCategory = isDonationCategory(category);
  const stepIndex = CREATE_TASK_STEPS.findIndex((s) => s.id === createStep);

  const isNextPreview = isNextStepPreview();
  const isLastStep = createStep === STEP_IDS.PREVIEW;

  const rightButtonText = isLastStep
    ? 'Confirm'
    : isNextPreview
      ? 'Preview'
      : 'Next step';

  const showLeftButton = showBack && stepIndex > 0;
  const leftButtonText = isLastStep ? 'Edit' : 'Go back';

  const handleNextClick = async (): Promise<void> => {
    const currentStepFields = CREATE_TASK_STEPS[stepIndex]?.fields || [];
    if (currentStepFields.length > 0) {
      const isValid = await trigger(currentStepFields);
      if (!isValid) {
        setIsRequiredModalOpen(true);
        return;
      }
    }

    if (!hasDonationCategory) {
      setValue('amount', undefined as unknown as number, { shouldDirty: true });
    }

    setCreateTaskDraft(getValues());

    if (isLastStep) {
      const currentFormData = getValues();
      const newTask = mapFormToCreateTask(currentFormData, {
        currentUser,
        organizations,
        id: crypto.randomUUID(),
      });

      const existingLocal = useTaskStore.getState().tasksByKey['local'] || [];
      useTaskStore
        .getState()
        .setTasksByKey('local', [...existingLocal, newTask]);

      if (newTask.location && newTask.category?.length) {
        addMarker({
          id: newTask.id,
          lat: newTask.lat,
          lng: newTask.lng,
          title: newTask.title,
          description: newTask.description,
          category: mapCategoryToMarker(newTask.category[0]),
        });
      }
      console.log('New Task Created:', newTask);
      resetCreateTask();
      reset(defaultTaskValues);
      setIsSuccess(true);
      return;
    }
    nextCreateStep();
  };

  const handleBackClick = (): void => {
    prevCreateStep();
  };

  const containerClass = (isLastStep: boolean): string =>
    cn(
      'flex w-full justify-center md:justify-end gap-3',
      isLastStep && 'md:gap-12'
    );

  const getButtonClass = (isLastStep: boolean): string =>
    cn(
      'flex-1 md:flex-none',
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
            className={cn('hover:border', getButtonClass(isLastStep))}
            onClick={handleBackClick}
            size="lg"
          >
            {leftButtonText}
          </Button>
        )}
        <Button
          variant="primary"
          size="lg"
          className={getButtonClass(isLastStep)}
          onClick={handleNextClick}
        >
          {rightButtonText}
        </Button>
      </div>

      {isRequiredModalOpen && (
        <RequiredFieldsModal
          isOpen={isRequiredModalOpen}
          onClose={() => setIsRequiredModalOpen(false)}
        />
      )}
    </>
  );
};
