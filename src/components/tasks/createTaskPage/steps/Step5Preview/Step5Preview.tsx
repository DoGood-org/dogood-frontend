'use client';

import { JSX, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { StepHeader } from '@/components/tasks/createTaskPage/StepHeader';
import { Task } from '@/components/tasks/taskPage/Task';
import { Section } from '@/components/ui/Section';
import { IconButtonGroup } from '@/components/tasks/taskPage/ButtonGroup/IconButtonGroup';
import { BackNextButtons } from '@/components/tasks/createTaskPage/Buttons/BackNextButtons';
import { StepIndicator } from '@/components/tasks/createTaskPage/StepIndicator';

import { TaskCategoryEnum } from '@/types/createTask.type';
import {
  formatDateForPreview,
  mapFormToCreateTask,
} from '@/utils/taskTransform';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { STEP_IDS } from '@/constants/stepIds';
import { useTranslations } from 'next-intl';

export const Step5Preview = (): JSX.Element => {
  const { watch } = useFormContext<BasicInfoFormValues>();
  const formValues = watch();

  const t = useTranslations('tasks.createTask');

  const organizations = useCreateTaskStore((s) => s.organizations);
  const currentUser = useCreateTaskStore((s) => s.currentUser);

  const isDonation =
    (formValues.category ?? []).includes(TaskCategoryEnum.Donation) ||
    Number(formValues.amount) > 0;

  const liveTask = useMemo(() => {
    const task = mapFormToCreateTask(formValues, {
      currentUser,
      organizations,
    });

    return {
      ...task,
      startDate: formatDateForPreview(task.startDate),
      endDate: formatDateForPreview(task.endDate),
    };
  }, [formValues, currentUser, organizations]);

  const currentTask = liveTask;

  return (
    <Section withContainer={true} className="mt-8 mb-8">
      <StepHeader
        stepId={isDonation ? STEP_IDS.PREVIEW : STEP_IDS.PAYMENT}
        title={t('preview')}
        titleClassName="text-lg mb-8 pl-0"
      />
      <Task task={currentTask} showEditButton={false} />
      <IconButtonGroup
        categories={currentTask.category}
        location={currentTask.location ?? null}
        taskId={currentTask.id}
        distance={currentTask.distance}
      />
      <div className="mt-8 flex justify-end">
        <BackNextButtons showBack={true} />
      </div>
      <div className="mt-6">
        <StepIndicator />
      </div>
    </Section>
  );
};
