import { useOrgSectionTitle } from '@/hooks/useOrgSectionTitle';
import { isAdminOrModerator, Role } from '@/lib/getUserRole';
import { UserOrganization } from '@/types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { JSX } from 'react';
import { Plus } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { OrgMemberList } from './OrgMemberList';

export const OrgMemberSection = ({
  members,
  role,
  orgId,
}: {
  members: UserOrganization[];
  role: Role;
  orgId: string;
}): JSX.Element => {
  const t = useTranslations('organization');

  const adminRole = isAdminOrModerator(role);
  const title = useOrgSectionTitle(role, 'members');

  const activeMembers = members.filter((member) => member.status === 'ACTIVE');

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start">
        <h2 className="text-h2-m lg:text-h2">{title}</h2>
        {adminRole && members.length <= 1 && (
          <Button
            asChild
            className="gap-[10px] mt-6 md:mt-0 align-right md:self-end"
          >
            <Link href="/tasks" className="text-white">
              <Plus className="size-5 fill-current" />
              {t('members.addMemberButton')}
            </Link>
          </Button>
        )}
      </div>

      <OrgMemberList members={activeMembers} orgId={orgId} />
    </>
  );
};
