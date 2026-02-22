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

interface TaskPreviewProps {
  task?: ITaskDetails;
}

const formatTime = (timeStr: string): string => {
  if (!timeStr) return '';
  const [start] = timeStr.split('-');
  if (!start) return '';

  let [hours, minutes] = start.split(':').map(Number);
  if (minutes === undefined) minutes = 0;

  const ampm = 'AM';
  hours = hours % 12 || 12;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export function transformBackendTaskToITaskDetails(task: any): ITaskDetails {
  if (!task || typeof task !== 'object') {
    throw new Error('Invalid task data from backend');
  }

  const lat =
    typeof task.lat === 'number' ? task.lat : (task.location?.lat ?? 0);
  const lng =
    typeof task.lng === 'number' ? task.lng : (task.location?.lng ?? 0);

  const category = Array.isArray(task.category)
    ? task.category
        .filter(Boolean)
        .map((c: string) => c.toLowerCase() as TaskCategoryEnum)
    : [];

  const parseDate = (date: any): string => {
    if (!date) return '';
    const d = new Date(date);
    return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
  };

  return {
    id: task.id ?? `task-${Date.now()}`,
    title: task.title || '',
    subtitle: task.subtitle || '',
    description: task.description || '',
    distance: '0',
    lat,
    lng,
    category,
    picture: task.picture ?? null,
    status: Object.values(TaskStatus).includes(task.status)
      ? task.status
      : TaskStatus.PENDING,
    locationName: task.locationName || '',
    location: { lat, lng },
    isOrganization: !!task.organizationId,
    organization: task.organization,
    startDate: parseDate(task.startDate),
    endDate: parseDate(task.endDate),
    startTime: formatTime(task.startTime || ''),
    actionType: task.actionType || TaskActionType.VOLUNTEERING,
    userParticipationStatus:
      task.userParticipationStatus || UserParticipationStatus.NONE,
    requirements: task.requirements || '',
    amount: task.amount ?? 0,
    currency: task.currency || 'USD',
  };
}

export const Step5Preview = ({ task }: TaskPreviewProps): JSX.Element => {
  const { watch } = useFormContext<BasicInfoFormValuesExtended>();
  const formValues = watch();

  const liveTask: ITaskDetails = useMemo(() => {
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
      actionType: formValues.actionType ?? TaskActionType.VOLUNTEERING,
      userParticipationStatus: UserParticipationStatus.NONE,
      requirements: formValues.requirements ?? '',
      amount: formValues.amount ?? 0,
      currency: formValues.currency ?? 'USD',
    };
  }, [formValues]);

  const currentTask = task ?? liveTask;

  return (
    <Section withContainer={true} className="mt-8 mb-8">
      <StepHeader step={5} title="Preview" titleClassName="text-lg mb-8 pl-0" />
      <Task task={currentTask} showEditButton={false} />
      <IconButtonGroup
        categories={currentTask.category}
        distance={currentTask.distance}
        location={currentTask.location ?? null}
        lat={currentTask.lat}
        lng={currentTask.lng}
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
