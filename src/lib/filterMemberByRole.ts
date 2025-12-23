import { UserOrganization } from '@/types';

export const filterMemberByRole = (
  members: UserOrganization[],
  role: string
): UserOrganization[] => {
  const filteredRole = members.filter(
    (member) => member.role === (role as string)
  );

  return filteredRole;
};
