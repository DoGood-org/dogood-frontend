'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  BasicInfoFormValues,
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
import { TaskActionType } from '@/types/tasks.type';

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

  const isResetting = useRef(false);

  const initialValues = useMemo(() => {
    const organizationValue = getOrganizationValue(
      createTaskDraft.host,
      createTaskDraft.organization
    );

    return {
      ...defaultTaskValues,
      ...createTaskDraft,
      organization: organizationValue,
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
    if (hasHydrated) {
      isResetting.current = true;
      reset(initialValues);
      setTimeout(() => {
        isResetting.current = false;
      }, 0);
    }
  }, [hasHydrated, reset, initialValues]);

  useEffect(() => {
    if (!hasHydrated) return;

    const subscription = watch((values) => {
      if (isResetting.current) return;

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
