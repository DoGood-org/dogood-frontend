import { Button } from '@/components';
import { Plus } from '@/components/icons';
import { Role } from '@/lib/getUserRole';
import { UserOrganization } from '@/types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { JSX } from 'react';

export const OrgMemberSection = ({
  members,
  role,
}: {
  members: UserOrganization[];
  role: Role;
}): JSX.Element => {
  const t = useTranslations('organization');

  const adminRole = role === 'ADMIN' || role === 'MODERATOR';

  const title = adminRole
    ? `${t('members.title')}`
    : `${t('members.userTitle')}`;

  const activeMembers = members.filter((member) => member.status === 'ACTIVE');

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-h2-m lg:text-h2">{title}</h2>
        {adminRole && members.length <= 1 && (
          <Button
            asChild
            className="gap-[10px] mt-11 md:mt-0 align-right self-end"
          >
            <Link href="/tasks" className="text-white">
              <Plus className="size-5 fill-current" />
              {t('members.addMember')}
            </Link>
          </Button>
        )}
      </div>

      {
        // ---------change this code ------
        <>
          <p>Count of members - {activeMembers.length}</p>
          <ul>
            {activeMembers.map((member) => (
              <li key={member.id}>
                <p>{member.userId}</p>
                <p>{member.role}</p>
              </li>
            ))}
          </ul>
        </>
        // ----------------------
      }
    </>
  );
};
