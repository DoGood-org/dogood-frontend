'use client';

import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import { TaskOwnerForm } from './TaskOwnerForm';
import { OrganizationFromBack, TaskHost } from '@/types/tasks.type';
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

  const currentValue: TaskHost = createTaskDraft.organization
    ? { type: 'ORGANIZATION', organization: createTaskDraft.organization }
    : { type: 'USER', user: { id: currentUserId, name: currentUserName } };

  const handleOwnerChange = (value: TaskHost): void => {
    if (value.type === 'USER') {
      setCreateTaskDraft({ organization: null });
      setValue('organization', null);
      return;
    }

    const org = organizations.find((o) => o.id === value.organization?.id);
    const organization = org ? { id: org.id, name: org.name } : null;

    setCreateTaskDraft({ organization });
    setValue('organization', organization);
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
