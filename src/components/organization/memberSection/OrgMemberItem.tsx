import { UserNoAvatar } from '@/components/account/accountPage/UserNoAvatar';
import { UserOrganization } from '@/types';
import Image from 'next/image';
import { JSX } from 'react';

export const OrgMemberItem = ({
  member,
}: {
  member: UserOrganization;
}): JSX.Element => {
  const { user } = member;
  return (
    <div
      key={member.id}
      className="bg-card p-4 gap-6 items-center rounded-lg flex md:gap-8"
    >
      {user.avatar ? (
        <Image
          src={user.avatar ?? '/account/avatar.png'}
          alt={user.name ?? 'User'}
          width={100}
          height={100}
          className="shrink-0 w-[100px] h-[100px] object-cover rounded-lg self-center md:self-start"
        />
      ) : (
        <UserNoAvatar className="shrink-0 w-[100px] h-[100px] object-cover rounded-lg self-center md:self-start" />
      )}

      <p>{user.name}</p>
    </div>
  );
};
