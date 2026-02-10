'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  BasicInfoFormValues,
  basicInfoSchema,
} from '@/lib/validation/createTask.schema';
import { JSX, useEffect, useMemo } from 'react';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';

export const CreateTaskForm = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null => {
  const { createTaskDraft, hasHydrated, setCreateTaskDraft } =
    useCreateTaskStore();

  const defaultValues = useMemo(
    () => ({
      amount: createTaskDraft.amount || undefined,
      currency: createTaskDraft.currency || 'USD',
      title: createTaskDraft.title || '',
      locationName: createTaskDraft.locationName || '',
      description: createTaskDraft.description || '',
      startTime: createTaskDraft.startTime || '',
      requirements: createTaskDraft.requirements || '',
      picture: createTaskDraft.picture ?? null,
      category: createTaskDraft.category || [],
      organizationId: createTaskDraft.organizationId ?? null,
      location:
        createTaskDraft.location?.lat != null &&
        createTaskDraft.location?.lng != null
          ? {
              lat: createTaskDraft.location.lat,
              lng: createTaskDraft.location.lng,
            }
          : null,
      startDate: createTaskDraft.startDate
        ? new Date(createTaskDraft.startDate)
        : undefined,
      endDate: createTaskDraft.endDate
        ? new Date(createTaskDraft.endDate)
        : undefined,
    }),
    [createTaskDraft]
  );

  const methods = useForm<BasicInfoFormValues>({
    resolver: yupResolver(basicInfoSchema),
    mode: 'onTouched',
    defaultValues: defaultValues,
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
