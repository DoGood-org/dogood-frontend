import { UserNoAvatar } from '@/components/account/accountPage/UserNoAvatar';
import { ChatCircle } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useOrganizationPermissions } from '@/hooks/useOrganizationPermissions';
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
}: {
  member: UserOrganization;
  role: OrganizationRole;
  currentRole: Role;
}): JSX.Element => {
  const { user } = member;
  const locale = useLocale();
  const t = useTranslations('organization');
  const imageStyles =
    'shrink-0 w-[100px] h-[100px] md:w-[100px] md:h-[100px] lg:h-[100px] lg:w-[100px] object-cover rounded-lg self-center md:self-start';

  const currentUser = authStore((s) => s.user);
  const {
    canRemoveMember,
    canDismissModerator,
    canRemoveModerator,
    canSendMessage,
  } = useOrganizationPermissions(currentRole);

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
      <div>
        {isModeratorSection && canDismissModerator && (
          <Button variant="ghost">{t('members.dismiss')}</Button>
        )}
        {canSendMessage && notCurrentUser && (
          <Button asChild variant="ghost" className="px-6">
            <Link href={`/${locale}/account/chat`}>
              <ChatCircle className="size-[18px]" />
              {t('members.send')}
            </Link>
          </Button>
        )}
        {isModeratorSection && canRemoveModerator && (
          <Button variant="ghost">{t('members.remove')}</Button>
        )}
        {isMemberSection && canRemoveMember && (
          <Button variant="ghost">{t('members.remove')}</Button>
        )}
      </div>
    </div>
  );
};
