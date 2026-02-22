'use client';

import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import { TaskOwnerForm } from './TaskOwnerForm';
import { OrganizationFromBack, TaskOwnerValue } from '@/types/tasks.type';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { useFormContext } from 'react-hook-form';

export interface Step0TaskOwnerProps {
  organizations: OrganizationFromBack[];
  currentUserName: string;
}

export const Step0TaskOwner = ({
  organizations,
  currentUserName,
}: Step0TaskOwnerProps): JSX.Element => {
  const { createTaskDraft, setCreateTaskDraft } = useCreateTaskStore();
  const { setValue } = useFormContext();

  const currentValue: TaskOwnerValue = createTaskDraft.organization
    ? { type: 'ORGANIZATION', organizationId: createTaskDraft.organization.id }
    : { type: 'USER' };

  const handleOwnerChange = (value: TaskOwnerValue): void => {
    const orgId = value.type === 'USER' ? null : value.organizationId;
    setCreateTaskDraft({
      organization: orgId
        ? { id: orgId, name: '', createdAt: new Date().toISOString() }
        : null,
    });
    setValue(
      'organization',
      orgId
        ? { id: orgId, name: '', createdAt: new Date().toISOString() }
        : null,
      { shouldDirty: true }
    );
  };
  return (
    <Section className="md:my-8 lg:my-8 my-container">
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
