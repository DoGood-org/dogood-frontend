import { UserOrganization } from '@/types';
import { ROLE_CONFIG } from '@/constants/roleConfig';
import { groupMembersByRole } from '@/lib/groupMembersByRole';
import { JSX } from 'react';
import { Slider } from '@/components/ui/Slider';
import { OrgMemberItem } from './OrgMemberItem';

export const OrgMemberList = ({
  members,
}: {
  members: UserOrganization[];
}): JSX.Element => {
  const grouped = groupMembersByRole(members);

  return (
    <div className="space-y-8">
      {ROLE_CONFIG.map(({ role, title }) => {
        const roleMembers = grouped[role];

        if (!roleMembers.length) return null;

        return (
          <section key={role}>
            <h3 className="text-[20px] mb-4">
              {title} ({roleMembers.length})
            </h3>

            <Slider
              items={roleMembers}
              itemsPerSlide={2}
              renderItem={(member, id) => (
                <OrgMemberItem key={`${id}-${member.userId}`} member={member} />
              )}
            />
          </section>
        );
      })}
    </div>
  );
};
