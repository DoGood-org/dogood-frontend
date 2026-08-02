import { UserNoAvatar } from '@/components/account/accountPage/UserNoAvatar';
import { ChatCircle, CloseIcon, Dismiss } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useDeleteMemberFromOrganization } from '@/hooks/useDeleteMemberFromOrganization';
import { useOrganizationPermissions } from '@/hooks/useOrganizationPermissions';
import { useUpdateMemberRole } from '@/hooks/useUpdateMemberRole';
import { OrganizationRole, Role, UserOrganization } from '@/types';
import { authStore } from '@/zustand/stores/authStore';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';

export const OrgMemberItem = ({
  member,
  role,
  currentRole,
  organizationId,
}: {
  member: UserOrganization;
  role: OrganizationRole;
  currentRole: Role;
  organizationId: string;
}): JSX.Element => {
  const { user, userId } = member;
  const locale = useLocale();
  const t = useTranslations('organization');
  const imageStyles =
    'shrink-0 w-[100px] h-[100px] md:w-[100px] md:h-[100px] lg:h-[100px] lg:w-[100px] object-cover rounded-lg self-center md:self-start';
  const buttonStyles =
    'text-text-gray hover:text-btn-hover focus:text-btn-hover active:text-btn-active flex gap-2';

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
    deleteMemberMutation.mutate({
      userId,
      organizationId,
    });
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

  return (
    <div
      key={member.id}
      className="flex items-center justify-between gap-6 p-4 rounded-lg bg-card"
    >
      <div className="flex items-center md:gap-8">
        {user.profile?.avatar ? (
          <Image
            src={user.profile?.avatar}
            alt={user.name}
            width={100}
            height={100}
            className={imageStyles}
          />
        ) : (
          <UserNoAvatar className={imageStyles} />
        )}

        <Link
          href={`/${locale}/profile/${user.id}`}
          className="text-base font-semibold hover:text-btn-hover focus:text-btn-hover active:text-btn-active"
        >
          {user.name}
        </Link>
      </div>
      <div className="flex">
        {isModeratorSection && canDismissModerator && (
          <Button
            variant="ghost"
            onClick={handleDismiss}
            className={buttonStyles}
          >
            <Dismiss className="size-5" />
            {t('members.dismiss')}
          </Button>
        )}
        {canSendMessage && notCurrentUser && (
          <Button asChild variant="ghost" className={`px-6 ${buttonStyles}`}>
            <Link href={`/${locale}/account/chat`}>
              <ChatCircle className="size-[18px]" />
              {t('members.send')}
            </Link>
          </Button>
        )}
        {isModeratorSection && canRemoveModerator && (
          <Button
            variant="ghost"
            onClick={handleDelete}
            className={buttonStyles}
          >
            <CloseIcon className="size-5" />
            {t('members.remove')}
          </Button>
        )}
        {isMemberSection && canRemoveMember && (
          <Button
            variant="ghost"
            onClick={handleDelete}
            className={buttonStyles}
          >
            <CloseIcon className="size-5" />
            {t('members.remove')}
          </Button>
        )}
      </div>
    </div>
  );
};
