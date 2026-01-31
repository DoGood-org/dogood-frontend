'use client';

import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import { TaskOwnerForm } from './TaskOwnerForm';
import { OrganizationFromBack, TaskOwnerValue } from '@/types/tasks.type';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';

export interface Step0TaskOwnerProps {
  organizations: OrganizationFromBack[];
  currentUserName: string;
}

export const Step0TaskOwner = ({
  organizations,
  currentUserName,
}: Step0TaskOwnerProps): JSX.Element => {
  const { createTaskDraft, setCreateTaskDraft } = useCreateTaskStore();

  const currentValue: TaskOwnerValue = createTaskDraft.organizationId
    ? { type: 'ORGANIZATION', organizationId: createTaskDraft.organizationId }
    : { type: 'USER' };

  const handleOwnerChange = (value: TaskOwnerValue): void => {
    if (value.type === 'USER') {
      setCreateTaskDraft({ organizationId: null });
    } else {
      setCreateTaskDraft({ organizationId: value.organizationId });
    }
  };

  return (
    <Section className="md:my-8 lg:my-8 mx-auto lg:mx-40">
      <h1 className="text-h1 mb-8 lg:ml-20">Create your next task</h1>
      <TaskOwnerForm
        value={currentValue}
        onChange={handleOwnerChange}
        organizations={organizations || []}
        userName={currentUserName}
      />
    </Section>
  );
};
