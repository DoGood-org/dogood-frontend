'use client';

import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import { TaskOwnerForm } from './TaskOwnerForm';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { OrganizationFromBack, TaskOwnerId } from '@/types/tasks.type';

interface Step0TaskOwnerProps {
  organizations: OrganizationFromBack[];
  currentUserName: string;
}

export const Step0TaskOwner = ({
  organizations,
  currentUserName,
}: Step0TaskOwnerProps): JSX.Element => {
  const { createTaskDraft, setCreateTaskDraft } = useTaskStore();

  const currentValue: TaskOwnerId | undefined =
    createTaskDraft.ownerType === 'user'
      ? 'user'
      : createTaskDraft.organizationId;

  const handleOwnerChange = (value: TaskOwnerId | undefined): void => {
    if (value === 'user') {
      setCreateTaskDraft({ ownerType: 'user', organizationId: undefined });
    } else {
      setCreateTaskDraft({ ownerType: 'organization', organizationId: value });
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
