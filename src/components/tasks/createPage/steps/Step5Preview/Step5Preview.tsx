'use client';

import { JSX, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { StepHeader } from '@/components/tasks/createPage/StepHeader';
import { Task } from '@/components/tasks/taskPage/Task';
import { Section } from '@/components/ui/Section';
import { IconButtonGroup } from '@/components/tasks/taskPage/ButtonGroup/IconButtonGroup';
import { BackNextButtons } from '@/components/tasks/createPage/Buttons/BackNextButtons';
import { StepIndicator } from '@/components/tasks/createPage/StepIndicator';

import {
  ITaskDetails,
  TaskStatus,
  UserParticipationStatus,
  TaskActionType,
} from '@/types/tasks.type';
import {
  BasicInfoFormValuesExtended,
  TaskCategoryEnum,
} from '@/types/createTask.type';
import { formatTime, TaskPreviewProps } from '@/utils/taskTransform';

export const Step5Preview = ({ task }: TaskPreviewProps): JSX.Element => {
  const { watch } = useFormContext<BasicInfoFormValuesExtended>();
  const formValues = watch();

  const isDonation =
    (formValues.category ?? []).includes(TaskCategoryEnum.Donation) ||
    Number(formValues.amount) > 0;

  const previewStep = isDonation ? 5 : 4;

  const liveTask: ITaskDetails = useMemo(() => {
    const finalIsDonation =
      (formValues.category ?? []).includes(TaskCategoryEnum.Donation) ||
      Number(formValues.amount) > 0;

    return {
      id: `preview-${Date.now()}`,
      title: formValues.title || '',
      subtitle: '',
      distance: '0',
      description: formValues.description || '',
      category: (formValues.category ?? []).filter(
        Boolean
      ) as TaskCategoryEnum[],
      picture: formValues.picture ?? null,
      status: TaskStatus.PENDING,
      locationName: formValues.locationName || '',
      location: formValues.location ?? { lat: 0, lng: 0 },
      isOrganization: !!formValues.organization,
      organizationId: formValues.organization ?? undefined,
      lat: formValues.location?.lat ?? 0,
      lng: formValues.location?.lng ?? 0,
      startDate:
        formValues.startDate instanceof Date
          ? formValues.startDate.toISOString().slice(0, 10)
          : '',
      endDate:
        formValues.endDate instanceof Date
          ? formValues.endDate.toISOString().slice(0, 10)
          : '',
      startTime: formatTime(formValues.startTime || ''),
      actionType: finalIsDonation
        ? TaskActionType.FUNDRAISING
        : TaskActionType.VOLUNTEERING,
      userParticipationStatus: UserParticipationStatus.NONE,
      requirements: formValues.requirements ?? '',
      amount: formValues.amount ?? 0,
      currency: formValues.currency ?? 'USD',
    };
  }, [formValues]);

  const currentTask = task ?? liveTask;

  return (
    <Section withContainer={true} className="mt-8 mb-8">
      <StepHeader
        step={previewStep}
        title="Preview"
        titleClassName="text-lg mb-8 pl-0"
      />
      <Task task={currentTask} showEditButton={false} />
      <IconButtonGroup
        categories={currentTask.category}
        location={currentTask.location ?? null}
        taskId={currentTask.id}
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
