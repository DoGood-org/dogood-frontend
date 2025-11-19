import { OrganizationRole, UserOrganization } from '@/types';
import { mockUser } from '@/data/mockUser';

export type Role = OrganizationRole | 'USER';

export const getUserRole = (members: UserOrganization[]): Role => {
  const user = members.filter(({ userId }) => userId === mockUser.id);
  const noRole = 'USER';

  if (!user || !user.length) {
    return noRole;
  } else {
    const userRole = user[0].role;
    return userRole;
  }
};
