'use client';

import { useState, useMemo, JSX } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AddMemberModalProps, UserShort } from '@/types';
import { searchUsersByName } from '@/services/publicUserService';
import { useAddMemberToOrganization } from '@/hooks/useAddMemberToOrganization';
import { useDebounce } from '@/hooks/useDebounce';
import { UserSearchList } from '../UserSearchList';
import { Modal } from '@/components/ui/Modal';
import { useTranslations } from 'next-intl';
import { AddMemberConfirmation } from './AddMemberConfirmation';
import { cn } from '@/lib/utils';
import { AddMemberSuccess } from './AddMemberSuccess';

type Step = 'list' | 'confirmation' | 'success';

export const AddMemberModal = ({
  organizationId,
  existingMemberIds,
  isOpen,
  onClose,
}: AddMemberModalProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserShort | null>(null);
  const [step, setStep] = useState<Step>('list');

  const debouncedQuery = useDebounce(query, 300);
  const t = useTranslations('organization');

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<UserShort[]>({
    queryKey: ['user-search', debouncedQuery],
    queryFn: () => searchUsersByName(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
  });

  const filteredUsers = useMemo(
    () => users.filter((user) => !existingMemberIds.includes(user.id)),
    [users, existingMemberIds]
  );

  const addMemberMutation = useAddMemberToOrganization(debouncedQuery);

  const handleClose = (): void => {
    setSelectedUser(null);
    setQuery('');
    setStep('list');
    onClose();
  };

  const handleCancel = (): void => {
    setSelectedUser(null);
    setStep('list');
  };

  const handleUserClick = (user: UserShort): void => {
    setSelectedUser(user);
    setStep('confirmation');
  };

  const handleAdd = (): void => {
    if (!selectedUser) return;

    addMemberMutation.mutate(
      {
        userId: selectedUser.id,
        organizationId,
        role: 'MEMBER',
        status: 'PENDING',
      },
      {
        onSuccess: () => {
          setStep('success');
        },
      }
    );
  };

  const handleInviteMore = (): void => {
    setSelectedUser(null);
    setQuery('');
    setStep('list');
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
      withCloseButton={step !== 'list'}
      wrapperClassName={cn('bg-modal', modalWidth)}
    >
      {step === 'list' && (
        <>
          <h3 className="text-reg md:text-h3 mb-4">{t('members.addMember')}</h3>

          <UserSearchList
            query={query}
            onQueryChange={setQuery}
            users={filteredUsers}
            isLoading={isLoading}
            isError={isError}
            onSelect={handleUserClick}
            getId={(user) => user.id}
            getName={(user) => user.name}
            getAvatar={(user) => user.avatar ?? undefined}
            disabled={addMemberMutation.isPending}
          />
        </>
      )}

      {step === 'confirmation' && selectedUser && (
        <AddMemberConfirmation
          userName={selectedUser.name}
          onConfirm={handleAdd}
          onCancel={handleCancel}
        />
      )}

      {step === 'success' && selectedUser && (
        <AddMemberSuccess
          userName={selectedUser.name}
          onInviteMore={handleInviteMore}
          onDone={handleClose}
        />
      )}
    </Modal>
  );
};
