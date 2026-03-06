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
  OrganizationFromBack,
  TaskHost,
} from '@/types/tasks.type';
import { TaskCategoryEnum } from '@/types/createTask.type';
import { formatTime, TaskPreviewProps } from '@/utils/taskTransform';
import { useTaskDistance } from '@/hooks/useTaskDistance';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';

interface ExtendedTaskPreviewProps extends TaskPreviewProps {
  organizations?: OrganizationFromBack[];
  currentUserId?: string;
  currentUserName?: string;
}

export const Step5Preview = ({
  task,
  organizations = [],
  currentUserId,
  currentUserName,
}: ExtendedTaskPreviewProps): JSX.Element => {
  const { watch } = useFormContext<BasicInfoFormValues>();
  const formValues = watch();

  const previewDistance = useTaskDistance(formValues.location, '0.1 km');

  const isDonation =
    (formValues.category ?? []).includes(TaskCategoryEnum.Donation) ||
    Number(formValues.amount) > 0;

  const previewStep = isDonation ? 5 : 4;

  const liveTask: ITaskDetails = useMemo(() => {
    const displayDistance =
      !previewDistance || previewDistance === '0 km'
        ? '0.1 km'
        : previewDistance;

    const selectedOrg = organizations.find(
      (org) =>
        org.id.toString() === (formValues.organizationId ?? '').toString()
    );

    const host: TaskHost =
      formValues.isOrganization && selectedOrg
        ? {
            type: 'ORGANIZATION',
            organizationId: selectedOrg.id,
            name: selectedOrg.name,
          }
        : {
            type: 'USER',
            userId: Number(currentUserId ?? 0),
            name: currentUserName ?? '',
          };

    return {
      id: `preview-${Date.now()}`,
      title: formValues.title || '',
      subtitle: '',
      distance: displayDistance,
      description: formValues.description || '',
      category: (formValues.category ?? []).filter(
        Boolean
      ) as TaskCategoryEnum[],
      picture: formValues.picture ?? null,
      status: TaskStatus.PENDING,
      locationName: formValues.locationName || '',
      location: formValues.location ?? { lat: 0, lng: 0 },
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
      requirements: formValues.requirements ?? '',
      amount: formValues.amount ?? 0,
      currency: formValues.currency ?? 'USD',
      host,
      organization:
        formValues.isOrganization && selectedOrg
          ? { id: selectedOrg.id, name: selectedOrg.name }
          : null,
    };
  }, [
    formValues,
    previewDistance,
    organizations,
    currentUserId,
    currentUserName,
  ]);
  console.log('LIVE TASK OBJECT:', liveTask);

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
        distance={currentTask.distance}
      />
      <div className="mt-8 flex justify-end">
        <BackNextButtons
          showBack={true}
          organizations={organizations}
          currentUserId={currentUserId}
          currentUserName={currentUserName}
        />
      </div>
      <div className="mt-6">
        <StepIndicator />
      </div>
    </Section>
  );
};
