'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  BasicInfoFormValues,
  basicInfoSchema,
} from '@/lib/validation/createTask.schema';
import { JSX, useEffect, useRef } from 'react';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';

export const CreateTaskForm = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null => {
  const { createTaskDraft, hasHydrated, setCreateTaskDraft } =
    useCreateTaskStore();

  const defaultValuesRef = useRef<BasicInfoFormValues>({
    picture: createTaskDraft.picture ?? null,
    title: createTaskDraft.title ?? '',
    locationName: createTaskDraft.locationName ?? '',
    location:
      createTaskDraft.location?.lat != null &&
      createTaskDraft.location?.lng != null
        ? {
            lat: createTaskDraft.location.lat,
            lng: createTaskDraft.location.lng,
          }
        : null,
    startDate: createTaskDraft.startDate ?? new Date(),
    endDate: createTaskDraft.endDate ?? new Date(),
    startTime: createTaskDraft.startTime ?? '',
    description: createTaskDraft.description ?? '',
    category: createTaskDraft.category ?? [],
    amount: createTaskDraft.amount ?? 0,
    currency: createTaskDraft.currency ?? 'USD',
    requirements: createTaskDraft.requirements ?? '',
    organizationId: createTaskDraft.organizationId ?? null,
  });

  const methods = useForm<BasicInfoFormValues>({
    resolver: yupResolver(basicInfoSchema),
    mode: 'onTouched',
    defaultValues: defaultValuesRef.current,
  });

  useEffect(() => {
    if (!hasHydrated) return;

    const subscription = methods.watch((values) => {
      setCreateTaskDraft(values as BasicInfoFormValues);
    });

    return (): void => subscription.unsubscribe();
  }, [hasHydrated, methods, setCreateTaskDraft]);

  if (!hasHydrated) return null;

  console.log(methods.watch());

  return <FormProvider {...methods}>{children}</FormProvider>;
};
