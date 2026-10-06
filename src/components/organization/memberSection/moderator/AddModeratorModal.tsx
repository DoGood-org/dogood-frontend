'use client';

import { useUpdateMemberRole } from '@/hooks/useUpdateMemberRole';
import { AddModeratorModalProps, UserOrganization } from '@/types';
import { JSX, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { useTranslations } from 'next-intl';
import { AddModeratorConfirmation } from './AddModeratorConfirmation';
import { UserSearchList } from '../UserSearchList';
import { cn } from '@/lib/utils';

type Step = 'list' | 'confirmation' | 'success';

export const AddModeratorModal = ({
  members,
  orgId,
  orgName,
  isOpen,
  onClose,
}: AddModeratorModalProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const [step, setStep] = useState<Step>('list');
  const [selectedUser, setSelectedUser] = useState<
    UserOrganization['user'] | null
  >(null);

  const t = useTranslations('organization');

  const updateRoleMutation = useUpdateMemberRole();

  const filteredUsers = members
    .filter((member) => member.role === 'MEMBER')
    .filter(
      (member) =>
        query.length < 3 ||
        member.user.name.toLowerCase().includes(query.toLowerCase())
    )
    .map((member) => member.user);

  const handleClose = (): void => {
    setSelectedUser(null);
    onClose();
  };

  const handleCancel = (): void => {
    setSelectedUser(null);
    setStep('list');
  };

  const handleUserClick = (user: UserOrganization['user']): void => {
    setSelectedUser(user);
    setStep('confirmation');
  };

  const handleAddModerator = (): void => {
    if (!selectedUser) return;

    updateRoleMutation.mutate(
      {
        organizationId: orgId,
        userId: selectedUser.id,
        role: 'MODERATOR',
      },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  const modalWidth = {
    list: 'w-[353px] max-w-[514px] md:w-[514px]',
    confirmation:
      'w-[353px] md:w-[514px] max-w-[700px] lg:w-[700px] p-6 md:p-12',
    success:
      'w-[353px] md:w-[514px] max-w-[790px] lg:w-[790px] px-6 py-12 md:p-12',
  }[step];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      withBackButton={false}
      wrapperClassName={cn('bg-modal', modalWidth)}
      withCloseButton={step !== 'list'}
    >
      {step === 'list' && (
        <>
          <h3 className="text-reg md:text-h3">{t('members.select')}</h3>
          <UserSearchList
            query={query}
            onQueryChange={setQuery}
            users={filteredUsers}
            onSelect={handleUserClick}
            getId={(user) => user.id}
            getName={(user) => user.name}
            getAvatar={(user) => user.profile?.avatar ?? undefined}
            disabled={updateRoleMutation.isPending}
          />
        </>
      )}
      {step === 'confirmation' && selectedUser && (
        <AddModeratorConfirmation
          userName={selectedUser.name}
          organizationName={orgName}
          onConfirm={handleAddModerator}
          onCancel={handleCancel}
        />
      )}
    </Modal>
  );
};
