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
} from '@/types/createTask.type';

export const CreateTaskForm = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null => {
  const { createTaskDraft, hasHydrated, setCreateTaskDraft } =
    useCreateTaskStore();

  const isInitialized = useRef(false);

  const initialValues = useMemo(() => {
    return {
      ...defaultTaskValues,
      ...createTaskDraft,
      amount: createTaskDraft.amount,
      startDate: createTaskDraft.startDate
        ? new Date(createTaskDraft.startDate)
        : defaultTaskValues.startDate,
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

      setCreateTaskDraft({
        ...values,
      } as CreateTaskDraft);
    });

    return (): void => subscription.unsubscribe();
  }, [hasHydrated, watch, setCreateTaskDraft]);

  if (!hasHydrated) return null;

  console.log(methods.watch());

  return <FormProvider {...methods}>{children}</FormProvider>;
};
