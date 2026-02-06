'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  BasicInfoFormValues,
  basicInfoSchema,
} from '@/lib/validation/createTask.schema';
import { JSX, useEffect } from 'react';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';

export const CreateTaskForm = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null => {
  const { createTaskDraft, hasHydrated, setCreateTaskDraft } =
    useCreateTaskStore();

  const defaultValues: BasicInfoFormValues = {
    picture: createTaskDraft.picture ?? null,
    title: createTaskDraft.title ?? '',
    location: createTaskDraft.location ?? '',
    startDate: createTaskDraft.startDate
      ? new Date(createTaskDraft.startDate)
      : new Date(),
    finishDate: createTaskDraft.finishDate
      ? new Date(createTaskDraft.finishDate)
      : new Date(),
    description: createTaskDraft.description ?? '',
    time: createTaskDraft.time ?? '',
    category: createTaskDraft.category ?? [],
    amount: createTaskDraft.amount ?? 0,
    currency: createTaskDraft.currency ?? 'USD',
    requirements: createTaskDraft.requirements ?? '',
    organizationId: createTaskDraft.organizationId ?? null,
  };

  const methods = useForm<BasicInfoFormValues>({
    resolver: yupResolver(basicInfoSchema),
    mode: 'onTouched',
    defaultValues,
  });

  useEffect(() => {
    if (hasHydrated) {
      methods.reset(createTaskDraft);
    }
  }, [hasHydrated]);

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
