'use client';

import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import { TaskOwnerForm } from './TaskOwnerForm';
import { OrganizationFromBack, TaskOwnerValue } from '@/types/tasks.type';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { useFormContext } from 'react-hook-form';
import { BasicInfoFormValuesExtended } from '@/types/createTask.type';

export interface Step0TaskOwnerProps {
  organizations: OrganizationFromBack[];
  currentUserName: string;
  currentUserId: string;
}

export const Step0TaskOwner = ({
  organizations,
  currentUserName,
  currentUserId,
}: Step0TaskOwnerProps): JSX.Element => {
  const { createTaskDraft, setCreateTaskDraft } = useCreateTaskStore();
  const { setValue } = useFormContext<BasicInfoFormValuesExtended>();

  const currentValue: TaskOwnerValue = createTaskDraft.organizationId
    ? { type: 'ORGANIZATION', organizationId: createTaskDraft.organizationId }
    : { type: 'USER' };

  const handleOwnerChange = (value: TaskOwnerValue): void => {
    if (value.type === 'USER') {
      setCreateTaskDraft({ organizationId: null });
      setValue('isOrganization', false);
      setValue('organizationId', null);
      return;
    }

    setCreateTaskDraft({ organizationId: value.organizationId });
    setValue('isOrganization', true);
    setValue('organizationId', value.organizationId);
  };

  return (
    <Section className="md:my-8 lg:my-8 my-container">
      <h1 className="text-h1 mb-8 lg:ml-20">Create your next task</h1>
      <TaskOwnerForm
        value={currentValue}
        onChange={handleOwnerChange}
        organizations={organizations || []}
        userName={currentUserName}
        userId={currentUserId}
      />
    </Section>
  );
};
