'use client';

import { ChatCircle, CloseIcon, Dismiss } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { MenuAction } from '@/components/ui/MenuAction';
import { Modal } from '@/components/ui/Modal';
import { MoreMenu } from '@/components/ui/MoreMenu';
import { useDeleteMemberFromOrganization } from '@/hooks/useDeleteMemberFromOrganization';
import { useOrganizationPermissions } from '@/hooks/useOrganizationPermissions';
import { useUpdateMemberRole } from '@/hooks/useUpdateMemberRole';
import { cn } from '@/lib/utils';
import { Action, ActionButtonProps } from '@/types';
import { authStore } from '@/zustand/stores/authStore';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { JSX, useState } from 'react';
import { MemberRemoveConfirmation } from './MemberRemoveConfirmation';

export const ActionButtonsList = ({
  currentRole,
  member,
  organizationId,
  role,
  orgName,
}: ActionButtonProps): JSX.Element => {
  const t = useTranslations('organization');
  const locale = useLocale();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const buttonStyles =
    'text-text-gray hover:text-btn-hover focus:text-btn-hover active:text-btn-active flex gap-2';

  const { user, userId } = member;
  const currentUser = authStore((s) => s.user);
  const {
    canRemoveMember,
    canDismissModerator,
    canRemoveModerator,
    canSendMessage,
  } = useOrganizationPermissions(currentRole);

  const deleteMemberMutation = useDeleteMemberFromOrganization();
  const updateRoleMutation = useUpdateMemberRole();

  const handleDelete = (): void => {
    setIsRemoveModalOpen(true);
  };

  const confirmDelete = (): void => {
    deleteMemberMutation.mutate(
      {
        userId,
        organizationId,
      },
      {
        onSuccess: () => {
          setIsRemoveModalOpen(false);
        },
      }
    );
  };

  const handleDismiss = (): void => {
    updateRoleMutation.mutate({
      organizationId,
      userId,
      role: 'MEMBER',
    });
  };

  const isModeratorSection = role === 'MODERATOR';
  const isMemberSection = role === 'MEMBER';
  const notCurrentUser = user.id !== currentUser?.id;

  const canRemove =
    (isModeratorSection && canRemoveModerator) ||
    (isMemberSection && canRemoveMember);

  const actions: Action[] = [
    {
      id: 'dismiss',
      visible: isModeratorSection && canDismissModerator,
      icon: Dismiss,
      label: t('members.dismiss'),
      onClick: handleDismiss,
    },
    {
      id: 'send',
      visible: canSendMessage && notCurrentUser,
      icon: ChatCircle,
      label: t('members.send'),
      href: `/${locale}/account/chat`,
      className: 'flex',
    },
    {
      id: 'remove',
      visible: canRemove,
      icon: CloseIcon,
      label: t('members.remove'),
      onClick: handleDelete,
    },
  ].filter((action) => action.visible);

  const renderDesktopAction = (action: Action): JSX.Element => {
    const Icon = action.icon;

    if (action.href) {
      return (
        <Button
          asChild
          variant="ghost"
          className={cn(buttonStyles, action.className)}
        >
          <Link href={action.href}>
            <Icon className="size-5" />
            {action.label}
          </Link>
        </Button>
      );
    }

    return (
      <Button
        variant="ghost"
        onClick={action.onClick}
        className={cn(buttonStyles, action.className)}
      >
        <Icon className="size-5" />
        {action.label}
      </Button>
    );
  };

  return (
    <>
      {/* Desktop */}
      <ul className="hidden lg:flex items-center gap-4">
        {actions.map((action) => (
          <li key={action.id}>{renderDesktopAction(action)}</li>
        ))}
      </ul>

      {/* Mobile / Tablet */}
      <div className="lg:hidden">
        <MoreMenu
          triggerClassName="items-center"
          menuListClassName="gap-0"
          items={actions.map((action) => ({
            id: action.id,
            content: (close) => (
              <MenuAction
                icon={action.icon}
                label={action.label}
                href={action.href}
                className="h-10 px-0 items-center"
                onClick={() => {
                  action.onClick?.();
                  close();
                }}
              />
            ),
          }))}
        />
      </div>
      <Modal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        withBackButton={false}
        withCloseButton
        wrapperClassName="bg-modal w-[353px] md:w-[514px] max-w-[700px] lg:w-[700px] p-6 md:p-12"
      >
        <MemberRemoveConfirmation
          userName={user.name}
          organizationName={orgName}
          onConfirm={confirmDelete}
          onCancel={() => setIsRemoveModalOpen(false)}
          isLoading={deleteMemberMutation.isPending}
        />
      </Modal>
    </>
  );
};
