'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { JSX, useState } from 'react';
import { RequiredFieldsModal } from '../RequiredFieldsModal/RequiredFieldsModal';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import {
  BasicInfoFormValuesExtended,
  TaskCategoryEnum,
} from '@/types/createTask.type';
import { useFormContext } from 'react-hook-form';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { defaultTaskValues } from '@/lib/validation/createTask.schema';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { useMapStore } from '@/zustand/stores/mapStore';
import { MarkerCategoryEnum } from '@/types';
import {
  IExtendedITaskProps,
  TaskActionType,
  TaskStatus,
  UserParticipationStatus,
} from '@/types/tasks.type';

type Props = {
  showBack?: boolean;
};
export const BackNextButtons = ({ showBack = true }: Props): JSX.Element => {
  const createStep = useCreateTaskStore((s) => s.createStep);
  const prevCreateStep = useCreateTaskStore((s) => s.prevCreateStep);
  const setIsSuccess = useCreateTaskStore((s) => s.setIsSuccess);
  const setCreateStep = useCreateTaskStore((s) => s.setCreateStep);
  const resetCreateTask = useCreateTaskStore((s) => s.resetCreateTask);

  const addMarker = useMapStore((s) => s.addMarker);

  const [isRequiredModalOpen, setIsRequiredModalOpen] = useState(false);

  const { trigger, watch, reset } = useFormContext();

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

  const mapCategoryToMarker = (
    category: TaskCategoryEnum
  ): MarkerCategoryEnum => {
    const mapping: Record<TaskCategoryEnum, MarkerCategoryEnum> = {
      [TaskCategoryEnum.Medicine]: MarkerCategoryEnum.Medicine,
      [TaskCategoryEnum.Nature]: MarkerCategoryEnum.Nature,
      [TaskCategoryEnum.Animal]: MarkerCategoryEnum.Animal,
      [TaskCategoryEnum.Food]: MarkerCategoryEnum.Food,
      [TaskCategoryEnum.Donation]: MarkerCategoryEnum.Default,
    };

    return mapping[category] || MarkerCategoryEnum.Default;
  };

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
      const data = watch() as BasicInfoFormValuesExtended;

      const startDate = new Date(data.startDate ?? defaultTaskValues.startDate);
      const endDate = new Date(data.endDate ?? defaultTaskValues.endDate);

      const startTime = data.startTime
        ? ((): string => {
            const [hourStr, minuteStr] = data.startTime.split('-');
            const date = new Date(startDate);
            date.setHours(Number(hourStr), Number(minuteStr), 0, 0);
            return date.toISOString();
          })()
        : startDate.toISOString();

      const payload = {
        ...defaultTaskValues,
        ...data,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        startTime,
        category: data.category,
        location: data.location ?? defaultTaskValues.location,
        locationName: data.locationName ?? defaultTaskValues.locationName,
      };

      const id = crypto.randomUUID();

      const newTask: IExtendedITaskProps = {
        id,
        title: payload.title,
        subtitle: payload.description.slice(0, 60),
        startDate: payload.startDate,
        endDate: payload.endDate,
        startTime: payload.startTime,
        picture: payload.picture ?? null,
        description: payload.description,
        category: payload.category,
        locationName: payload.locationName,
        location: payload.location,
        lat: payload.location?.lat ?? 0,
        lng: payload.location?.lng ?? 0,
        distance: '0 km',
        actionType: isDonation
          ? TaskActionType.FUNDRAISING
          : TaskActionType.VOLUNTEERING,
        userParticipationStatus: UserParticipationStatus.NONE,
        status: TaskStatus.CREATED,
        organization: payload.organization,
        isFavorite: false,
        isSelected: false,
        amount: payload.amount ?? 0,
        currency: payload.currency ?? 'USD',
        requirements: payload.requirements ?? '',
      };

      const existingLocal = useTaskStore.getState().tasksByKey['local'] || [];
      useTaskStore
        .getState()
        .setTasksByKey('local', [...existingLocal, newTask]);

      if (!isDonation && payload.location && payload.category.length > 0) {
        addMarker({
          id,
          lat: payload.location.lat,
          lng: payload.location.lng,
          title: payload.title,
          description: payload.description,
          category: mapCategoryToMarker(payload.category[0]),
        });
      }
      console.log(payload);
      resetCreateTask();
      reset(defaultTaskValues);
      setIsSuccess(true);
      return;
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
