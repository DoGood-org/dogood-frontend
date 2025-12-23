import { OrganizationRole, UserOrganization } from '@/types';
import { authStore } from '@/zustand/stores/authStore';

export type Role = OrganizationRole | 'USER';

export const getUserRole = (members: UserOrganization[]): Role => {
  const currentUser = authStore((s) => s.user);
  const noRole = 'USER';

  if (!currentUser) return noRole;

  const userWithRole = members.filter(
    ({ userId }) => userId === currentUser.id
  );

  if (!userWithRole || !userWithRole.length) {
    return noRole;
  } else {
    const userRole = userWithRole[0].role;
    return userRole;
  }
};

export const isAdminOrModerator = (role: Role): boolean => {
  const adminRole = role === 'ADMIN' || role === 'MODERATOR';
  return adminRole;
};
