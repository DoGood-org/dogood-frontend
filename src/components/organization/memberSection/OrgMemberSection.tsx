import { useOrgSectionTitle } from '@/hooks/useOrgSectionTitle';
import { isAdminOrModerator, Role } from '@/lib/getUserRole';
import { UserOrganization } from '@/types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { JSX } from 'react';
import { Plus } from '@/components/icons';
import { Button } from '@/components/ui/Button';

export const OrgMemberSection = ({
  members,
  role,
}: {
  members: UserOrganization[];
  role: Role;
}): JSX.Element => {
  const t = useTranslations('organization');

  const adminRole = isAdminOrModerator(role);
  const title = useOrgSectionTitle(role, 'members');

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
              {t('members.addMemberButton')}
            </Link>
          </Button>
        )}
      </div>

      {
        // TODO ---------------
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
