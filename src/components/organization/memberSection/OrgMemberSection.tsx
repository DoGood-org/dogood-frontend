import { useOrgSectionTitle } from '@/hooks/useOrgSectionTitle';
import { UserOrganization } from '@/types';
import { JSX } from 'react';
import { OrgMemberList } from './OrgMemberList';
import { useOrganizationPermissions } from '@/hooks/useOrganizationPermissions';
import { useUserRole } from '@/components/providers/UserRoleProvider';
import { AddMember } from './AddMember';

export const OrgMemberSection = ({
  members,
  orgId,
}: {
  members: UserOrganization[];
  orgId: string;
}): JSX.Element => {
  const role = useUserRole();

  const { canAddMember } = useOrganizationPermissions(role);

  const title = useOrgSectionTitle(role, 'members');

  const activeMembers = members.filter((member) => member.status === 'ACTIVE');

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start">
        <h2 className="text-h2-m lg:text-h2">{title}</h2>
        {canAddMember && members.length <= 1 && (
          <AddMember
            organizationId={orgId}
            existingMembers={members}
            variant="default"
            className="text-white"
          />
        )}
      </div>

      <OrgMemberList members={activeMembers} orgId={orgId} />
    </>
  );
};
