'use client';
import { JSX } from 'react';
import { StepHeader } from '../../StepHeader';
import { Task } from '@/components/tasks/taskPage/Task';
import { ITaskDetails, UserParticipationStatus } from '@/types/tasks.type';
import { TaskActionType } from '@/types/tasks.type';
import { Section } from '@/components/ui/Section';
import { IconButtonGroup } from '@/components/tasks/taskPage/ButtonGroup/IconButtonGroup';
import { BackNextButtons } from '../../Buttons/BackNextButtons';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';
import { TaskCategoryEnum } from '@/types/createTask.type';
import { StepIndicator } from '../../StepIndicator';

interface TaskPreviewProps {
  task?: ITaskDetails;
}

type CreateTaskValues = BasicInfoFormValues & {
  category: TaskCategoryEnum[];
  actionType: TaskActionType;
  userParticipationStatus?: UserParticipationStatus;
  organizationId?: string;
  isOrganization?: boolean;
  requirements?: string;
};

function createTaskFromForm(
  values: CreateTaskValues,
  overrides?: Partial<ITaskDetails>
): ITaskDetails {
  return {
    id: `task-${Date.now()}`,
    title: values.title,
    subtitle: '',
    description: values.description,
    distance: '0 km',
    lat: 0,
    lng: 0,
    category: values.category,
    picture: values.picture,
    status: 'PENDING',
    locationName: values.locationName,
    location: values.location,
    startDate: values.startDate?.toISOString().slice(0, 10) ?? '',
    endDate: values.endDate?.toISOString().slice(0, 10) ?? '',
    startTime: values.startTime,
    actionType: values.actionType,
    userParticipationStatus:
      values.userParticipationStatus ?? UserParticipationStatus.NONE,
    isOrganization: values.isOrganization ?? false,
    organizationId: values.organizationId,
    requirements: values.requirements,
    ...overrides,
  };
}

const mockTaskValues: CreateTaskValues = {
  title: 'Help Animals in Need',
  locationName: 'Willow Creek, Oregon',
  location: { lat: 50.4501, lng: 30.5234 },
  startDate: new Date(),
  endDate: new Date(),
  startTime: '09:00 AM',
  picture:
    'https://res.cloudinary.com/dinpgnkhh/image/upload/v1760461912/dog_gc3uel.png',
  description: 'Join our volunteer team to care for rescued animals...',
  category: [TaskCategoryEnum.Animal, TaskCategoryEnum.Donation],
  actionType: TaskActionType.VOLUNTEERING,
  userParticipationStatus: UserParticipationStatus.NONE,
  isOrganization: true,
  organizationId: 'org-1',
  requirements: 'Love and compassion for animals',
  amount: 5,
  currency: 'USD',
};

const mockTask: ITaskDetails = createTaskFromForm(mockTaskValues);

export const Step5Preview = ({ task }: TaskPreviewProps): JSX.Element => {
  const currentTask = task ?? mockTask;
  return (
    <Section withContainer={true} className="mt-8 mb-8">
      <StepHeader step={5} title="Preview" titleClassName="text-lg mb-8 pl-0" />
      <Task task={currentTask} showEditButton={false} />
      <IconButtonGroup
        categories={currentTask.category}
        distance={currentTask.distance}
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
