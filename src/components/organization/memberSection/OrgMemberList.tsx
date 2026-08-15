import { UserOrganization } from '@/types';
import { ROLE_CONFIG } from '@/constants/roleConfig';
import { groupMembersByRole } from '@/lib/groupMembersByRole';
import { JSX } from 'react';
import { Slider } from '@/components/ui/Slider';
import { OrgMemberItem } from './OrgMemberItem';
import { EmptyContent } from '../EmptyContent';
import { useTranslations } from 'next-intl';
import { AddModerator } from './moderator/AddModerator';
import { AddMember } from './member/AddMember';
import { useOrganizationPermissions } from '@/hooks/useOrganizationPermissions';
import { useOrganizationRole } from '@/hooks/useOrganizationRole';

export const OrgMemberList = ({
  members,
  orgId,
  orgName,
}: {
  members: UserOrganization[];
  orgId: string;
  orgName: string;
}): JSX.Element => {
  const grouped = groupMembersByRole(members);
  const t = useTranslations('organization');
  const currentRole = useOrganizationRole(members); // роль в організації юзера, який залогінений на сайті

  const { canAddMember, canAddModerator } =
    useOrganizationPermissions(currentRole);

  return (
    <div className="space-y-8">
      {ROLE_CONFIG.map(({ role, title }) => {
        const roleMembers = grouped[role];
        const noEmptyMemberList = grouped['MEMBER'].length;

        return (
          <section key={role}>
            <div className="flex flex-col gap-6 md:flex-row items-start md:justify-between mb-6">
              <h3 className="text-[20px] lg:text-h3">
                {title} ({roleMembers.length})
              </h3>
              {canAddModerator &&
                !!noEmptyMemberList &&
                role === 'MODERATOR' && (
                  <AddModerator
                    members={members}
                    orgName={orgName}
                    orgId={orgId}
                  />
                )}
              {canAddMember && role === 'MEMBER' && (
                <AddMember organizationId={orgId} existingMembers={members} />
              )}
            </div>

            {roleMembers.length ? (
              <Slider
                items={roleMembers}
                itemsPerSlide={4}
                itemClassName="p-0"
                listClassName="gap-4"
                renderItem={(member, id) => (
                  <OrgMemberItem
                    key={`${id}-${member.userId}`}
                    member={member}
                    role={role}
                    currentRole={currentRole}
                    organizationId={orgId}
                    orgName={orgName}
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
