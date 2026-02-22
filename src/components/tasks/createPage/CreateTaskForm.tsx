'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  BasicInfoFormValues,
  basicInfoSchema,
  defaultTaskValues,
} from '@/lib/validation/createTask.schema';
import { JSX, useEffect, useMemo } from 'react';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import {
  BasicInfoFormValuesExtended,
  CreateTaskDraft,
} from '@/types/createTask.type';

const getOrganizationValue = (
  host: CreateTaskDraft['host'],
  draft: CreateTaskDraft['organization']
): BasicInfoFormValues['organization'] => {
  if (host?.organization) return host.organization;
  if (draft) return draft;
  return null;
};

export const CreateTaskForm = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null => {
  const { createTaskDraft, hasHydrated, setCreateTaskDraft } =
    useCreateTaskStore();

  const defaultValues = useMemo(() => {
    const organizationValue = getOrganizationValue(
      createTaskDraft.host,
      createTaskDraft.organization
    );

    return {
      ...defaultTaskValues,
      title: createTaskDraft.title ?? '',
      description: createTaskDraft.description ?? '',
      locationName: createTaskDraft.locationName ?? '',
      startTime: createTaskDraft.startTime ?? '',
      requirements: createTaskDraft.requirements ?? '',
      picture: createTaskDraft.picture ?? null,
      category: createTaskDraft.category ?? [],
      amount: createTaskDraft.amount ?? undefined,
      currency: createTaskDraft.currency ?? 'USD',
      organization: organizationValue,
      host: createTaskDraft.host ?? undefined,
      startDate: createTaskDraft.startDate
        ? new Date(createTaskDraft.startDate)
        : undefined,
      endDate: createTaskDraft.endDate
        ? new Date(createTaskDraft.endDate)
        : undefined,
    } as BasicInfoFormValuesExtended;
  }, [createTaskDraft]);

  const methods = useForm<BasicInfoFormValuesExtended>({
    resolver: yupResolver(basicInfoSchema),
    mode: 'onTouched',
    defaultValues,
  });

  useEffect(() => {
    if (!hasHydrated) return;
    const subscription = methods.watch((values) => {
      setCreateTaskDraft(values as BasicInfoFormValuesExtended);
    });
    return (): void => subscription.unsubscribe();
  }, [hasHydrated, methods, setCreateTaskDraft]);

  if (!hasHydrated) return null;

  console.log(methods.watch());

  return <FormProvider {...methods}>{children}</FormProvider>;
};
