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
import { CreateTaskDraft } from '@/types/createTask.type';
import debounce from 'lodash/debounce';

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
      amount: createTaskDraft.amount ?? null,
      startDate: createTaskDraft.startDate
        ? new Date(createTaskDraft.startDate)
        : undefined,
      endDate: createTaskDraft.endDate
        ? new Date(createTaskDraft.endDate)
        : undefined,
    } as BasicInfoFormValues;
  }, [createTaskDraft]);

  const methods = useForm<BasicInfoFormValues>({
    resolver: yupResolver(basicInfoSchema),
    mode: 'onTouched',
    defaultValues: initialValues,
  });

  const { reset, watch } = methods;

  const debouncedSave = useRef(
    debounce((values: BasicInfoFormValues) => {
      setCreateTaskDraft(values as CreateTaskDraft);
    }, 300)
  ).current;

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

      debouncedSave(values as BasicInfoFormValues);
    });

    return (): void => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [hasHydrated, watch, debouncedSave]);

  if (!hasHydrated) return null;

  return <FormProvider {...methods}>{children}</FormProvider>;
};
