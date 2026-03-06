import { UserOrganization } from '@/types';
import { ROLE_CONFIG } from '@/constants/roleConfig';
import { groupMembersByRole } from '@/lib/groupMembersByRole';
import { JSX } from 'react';
import { Slider } from '@/components/ui/Slider';
import { OrgMemberItem } from './OrgMemberItem';
import { EmptyContent } from '../EmptyContent';
import { useTranslations } from 'next-intl';
// import { getUserRole, isAdminOrModerator } from '@/lib/getUserRole';
import { AddModerator } from './AddModerator';
import { AddMember } from './AddMember';
import { useOrganizationPermissions } from '@/hooks/useOrganizationPermissions';
import { getUserRole } from '@/lib/getUserRole';

export const OrgMemberList = ({
  members,
  orgId,
}: {
  members: UserOrganization[];
  orgId: string;
}): JSX.Element => {
  const grouped = groupMembersByRole(members);
  const t = useTranslations('organization');
  // const adminRole = isAdminOrModerator(getUserRole(members));
  const currentRole = getUserRole(members);

  const { canAddMember, canAddModerator } =
    useOrganizationPermissions(currentRole);

  return (
    <div className="space-y-8">
      {ROLE_CONFIG.map(({ role, title }) => {
        const roleMembers = grouped[role];
        // const noEmptyMemberList = adminRole && roleMembers.length;.
        const noEmptyMemberList = grouped['MEMBER'].length;

        return (
          <section key={role}>
            <div className="flex flex-col gap-6 md:flex-row items-start md:justify-between mb-6">
              <h3 className="text-[20px] lg:text-h3">
                {title} ({roleMembers.length})
              </h3>
              {canAddModerator &&
                !!noEmptyMemberList &&
                role === 'MODERATOR' && <AddModerator members={members} />}
              {canAddMember && role === 'MEMBER' && (
                <AddMember organizationId={orgId} existingMembers={members} />
              )}
            </div>

            {roleMembers.length ? (
              <Slider
                items={roleMembers}
                itemsPerSlide={4}
                itemClassName="p-0"
                renderItem={(member, id) => (
                  <OrgMemberItem
                    key={`${id}-${member.userId}`}
                    member={member}
                    role={role}
                    currentRole={currentRole}
                  />
                )}
              />
            ) : (
              <EmptyContent>
                {role === 'MODERATOR' && `${t('noModerator')}`}
                {role === 'MEMBER' && `${t('noMember')}`}
              </EmptyContent>
            )}
          </section>
        );
      })}
    </div>
  );
};
