'use client';

import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import { TaskOwnerForm } from './TaskOwnerForm';
import { useCreateTaskStore } from '@/zustand/stores/createTask.store';
import { useFormContext } from 'react-hook-form';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';
import { TaskOwnerValue } from '@/types/tasks.type';
import { useTranslations } from 'next-intl';

export const Step0TaskOwner = (): JSX.Element => {
  const t = useTranslations('tasks.createTask');

  const { createTaskDraft, setCreateTaskDraft, currentUser, organizations } =
    useCreateTaskStore();
  const { setValue } = useFormContext<BasicInfoFormValues>();

  const currentValue: TaskOwnerValue = createTaskDraft.organizationId
    ? { type: 'ORGANIZATION', organizationId: createTaskDraft.organizationId }
    : { type: 'USER' };

  const handleOwnerChange = (value: TaskOwnerValue): void => {
    const isOrg = value.type === 'ORGANIZATION';
    const orgId = isOrg ? (value.organizationId ?? null) : null;

    setCreateTaskDraft({ organizationId: orgId });

    setValue('isOrganization', isOrg, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue('organizationId', orgId, {
      shouldDirty: true,
    });
  };

  return (
    <Section className="md:my-8 lg:my-8 my-container">
      <h1 className="text-h1 mb-8 lg:ml-20">{t('title')}</h1>
      <TaskOwnerForm
        value={currentValue}
        onChange={handleOwnerChange}
        organizations={organizations || []}
        userName={currentUser?.name || ''}
        userId={currentUser?.id || ''}
      />
    </Section>
  );
};
