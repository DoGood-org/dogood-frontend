import { UserNoAvatar } from '@/components/account/accountPage/UserNoAvatar';
import { OrgMmberItemProps } from '@/types';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';
import { ActionButtonsList } from './ActionButtonsList';
import { authStore } from '@/zustand/stores/authStore';

export const OrgMemberItem = ({
  member,
  role,
  currentRole,
  organizationId,
  orgName,
}: OrgMmberItemProps): JSX.Element => {
  const { user } = member;
  const locale = useLocale();

  const imageStyles =
    'shrink-0 w-[100px] h-[100px] md:w-[100px] md:h-[100px] lg:h-[100px] lg:w-[100px] object-cover rounded-lg self-center md:self-start';

  const currentUser = authStore((s) => s.user);
  const notCurrentUser = user.id !== currentUser?.id;
  return (
    <div
      key={member.id}
      className="flex items-center justify-between gap-6 p-4 rounded-lg bg-card"
    >
      <div className="flex items-center gap-6 md:gap-8">
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
      {notCurrentUser && (
        <div className="flex">
          <ActionButtonsList
            currentRole={currentRole}
            member={member}
            role={role}
            organizationId={organizationId}
            orgName={orgName}
          />
        </div>
      )}
    </div>
  );
};
