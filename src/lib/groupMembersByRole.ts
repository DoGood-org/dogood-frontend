import { OrganizationRole, UserOrganization } from '@/types';

export const groupMembersByRole = (
  members: UserOrganization[]
): Record<OrganizationRole, UserOrganization[]> => {
  return members.reduce<Record<OrganizationRole, UserOrganization[]>>(
    (acc, member) => {
      acc[member.role].push(member);
      return acc;
    },
    {
      ADMIN: [],
      MODERATOR: [],
      MEMBER: [],
    }
  );
};
