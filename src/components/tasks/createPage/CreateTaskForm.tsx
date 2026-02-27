'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  basicInfoSchema,
  defaultTaskValues,
} from '@/lib/validation/createTask.schema';
import { JSX, useEffect, useMemo, useRef } from 'react';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import {
  BasicInfoFormValuesExtended,
  CreateTaskDraft,
  TaskCategoryEnum,
} from '@/types/createTask.type';
import { TaskActionType, TaskHost } from '@/types/tasks.type';

const getOrganizationValue = (
  host?: TaskHost,
  draftOrg?: { id: string; name: string } | null
): string | null => {
  if (host?.type === 'ORGANIZATION') return host.organization.id;
  return draftOrg?.id ?? null;
};

export const CreateTaskForm = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null => {
  const { createTaskDraft, hasHydrated, setCreateTaskDraft } =
    useCreateTaskStore();

  const isInitialized = useRef(false);

  const initialValues = useMemo(() => {
    const organizationValue = getOrganizationValue(
      createTaskDraft.host,
      createTaskDraft.organization
    );

    return {
      ...defaultTaskValues,
      ...createTaskDraft,
      organization: organizationValue,
      host: createTaskDraft.host || undefined,
      joinedUsers: createTaskDraft.joinedUsers || [],
      amount: createTaskDraft.amount || undefined,
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
    defaultValues: initialValues,
  });

  const { reset, watch } = methods;

  useEffect(() => {
    if (hasHydrated && !isInitialized.current) {
      reset(initialValues);
      isInitialized.current = true;
    }
  }, [hasHydrated, reset, initialValues]);

  useEffect(() => {
    if (!hasHydrated) return;

    const subscription = watch((values, { type }) => {
      if (!type) return;

      const isFundraising =
        (values.amount && values.amount > 0) ||
        values.category?.includes(TaskCategoryEnum.Donation);

      setCreateTaskDraft({
        ...values,
        actionType: isFundraising
          ? TaskActionType.FUNDRAISING
          : TaskActionType.VOLUNTEERING,
      } as CreateTaskDraft);
    });

    return (): void => subscription.unsubscribe();
  }, [hasHydrated, watch, setCreateTaskDraft]);

  if (!hasHydrated) return null;

  console.log(methods.watch());

  return <FormProvider {...methods}>{children}</FormProvider>;
};
