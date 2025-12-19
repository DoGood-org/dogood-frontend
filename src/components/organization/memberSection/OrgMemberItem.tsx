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
  const imageStyles =
    'shrink-0 w-[100px] h-[100px] md:w-[100px] md:h-[100px] lg:h-[100px] lg:w-[100px] object-cover rounded-lg self-center md:self-start';

  return (
    <div
      key={member.id}
      className="bg-card p-4 gap-6 items-center rounded-lg flex md:gap-8"
    >
      {user.avatar ? (
        <Image
          src={user.avatar}
          alt={user.name}
          width={100}
          height={100}
          className={imageStyles}
        />
      ) : (
        <UserNoAvatar className={imageStyles} />
      )}

      <p className="text-base  font-semibold">{user.name}</p>
    </div>
  );
};
