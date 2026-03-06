'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { JSX, useMemo, useState } from 'react';
import { RequiredFieldsModal } from '../RequiredFieldsModal/RequiredFieldsModal';
import {
  DESCRIPTION_STEP,
  PAYMENT_STEP,
  PREVIEW_STEP,
  useCreateTaskStore,
} from '@/zustand/stores/createTask.store';
import { useFormContext } from 'react-hook-form';
import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import {
  BasicInfoFormValues,
  defaultTaskValues,
} from '@/lib/validation/createTask.schema';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { useMapStore } from '@/zustand/stores/mapStore';
import {
  IExtendedITaskProps,
  OrganizationFromBack,
  TaskStatus,
} from '@/types/tasks.type';
import { isDonationCategory } from '@/utils/isDonationCategory';
import { mapCategoryToMarker } from '@/utils/mapCategoryToMarker';

type Props = {
  showBack?: boolean;
  organizations?: OrganizationFromBack[];
  currentUserId?: string;
  currentUserName?: string;
};
export const BackNextButtons = ({
  showBack = true,
  organizations,
  currentUserId,
  currentUserName,
}: Props): JSX.Element => {
  const createStep = useCreateTaskStore((s) => s.createStep);
  const setIsSuccess = useCreateTaskStore((s) => s.setIsSuccess);
  const setCreateStep = useCreateTaskStore((s) => s.setCreateStep);
  const resetCreateTask = useCreateTaskStore((s) => s.resetCreateTask);

  const addMarker = useMapStore((s) => s.addMarker);

  const [isRequiredModalOpen, setIsRequiredModalOpen] = useState(false);

  const { trigger, watch, reset, setValue } =
    useFormContext<BasicInfoFormValues>();

  const category = watch('category');
  const amount = watch('amount');

  const isDonation = useMemo(() => {
    const hasDonationCategory = isDonationCategory(category);
    const hasAmount = Number(amount) > 0;
    return hasDonationCategory || hasAmount;
  }, [category, amount]);

  const isLastStep = createStep === PREVIEW_STEP;

  const isBeforePreview =
    createStep === PAYMENT_STEP ||
    (createStep === DESCRIPTION_STEP && !isDonation);

  const rightButtonText = isLastStep
    ? 'Confirm'
    : isBeforePreview
      ? 'Preview'
      : 'Next step';

  const showLeftButton = showBack && createStep > 0;
  const leftButtonText = isLastStep ? 'Edit' : 'Go back';

  const handleNextClick = async (): Promise<void> => {
    const stepIndex = createStep > 0 ? createStep - 1 : null;

    if (stepIndex !== null) {
      const isValid = await trigger(CREATE_TASK_STEPS[stepIndex].fields);
      if (!isValid) {
        setIsRequiredModalOpen(true);
        return;
      }
    }

    const currentCategory = watch('category');
    const hasDonation = isDonationCategory(currentCategory);

    if (!hasDonation) {
      setValue('amount', undefined as unknown as number, { shouldDirty: true });
    }

    if (isLastStep) {
      const data = watch();

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

      const selectedOrg = organizations?.find(
        (org) => String(org.id) === String(data.organizationId)
      );

      const hostName =
        data.isOrganization && selectedOrg
          ? selectedOrg.name
          : !data.isOrganization && currentUserName
            ? currentUserName
            : '';

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
        status: TaskStatus.PENDING,
        host:
          data.isOrganization && selectedOrg
            ? {
                type: 'ORGANIZATION',
                organizationId: selectedOrg.id,
                name: selectedOrg.name,
              }
            : {
                type: 'USER',
                userId: Number(currentUserId ?? 0),
                name: hostName,
              },
        organization:
          data.isOrganization && selectedOrg
            ? { id: selectedOrg.id, name: selectedOrg.name }
            : null,
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

      const isDonationTask = isDonationCategory(payload.category);

      if (!isDonationTask && payload.location && payload.category.length > 0) {
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

    if (createStep === DESCRIPTION_STEP && !isDonation) {
      setCreateStep(PREVIEW_STEP);
    } else {
      setCreateStep(createStep + 1);
    }
  };

  const handleBackClick = (): void => {
    if (createStep === PREVIEW_STEP && !isDonation) {
      setCreateStep(DESCRIPTION_STEP);
      return;
    }
    setCreateStep(Math.max(0, createStep - 1));
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
            onClick={handleBackClick}
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

      {isRequiredModalOpen && (
        <RequiredFieldsModal
          isOpen={isRequiredModalOpen}
          onClose={() => setIsRequiredModalOpen(false)}
        />
      )}
    </>
  );
};
