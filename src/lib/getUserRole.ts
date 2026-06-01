import { ICurrentUser, Role, UserOrganization } from '@/types';
import { authStore } from '@/zustand/stores/authStore';

// export const getUserRole = (members: UserOrganization[]): Role => {
//   const currentUser = authStore((s) => s.user);
//   const noRole = 'USER';

//   if (!currentUser) return noRole;

//   const userWithRole = members.filter(
//     ({ userId }) => userId === currentUser.id
//   );

//   if (!userWithRole || !userWithRole.length) {
//     return noRole;
//   } else {
//     const userRole = userWithRole[0].role;
//     return userRole;
//   }
// };
// export type PermissionRole = Role | 'GUEST';

export const getUserRole = (members: UserOrganization[]): Role => {
  const currentUser = authStore((s) => s.user);
  if (!currentUser) return 'GUEST';

  const member = members.find(({ userId }) => userId === currentUser.id);

  return member?.role ?? 'USER';
};

export const isAdminOrModerator = (role: Role): boolean => {
  const adminRole = role === 'ADMIN' || role === 'MODERATOR';
  return adminRole;
};

export const getUserRoleFromMembers = (
  members: UserOrganization[],
  user: ICurrentUser | null
): Role => {
  if (!user) return 'GUEST';

  const member = members.find(({ userId }) => userId === user.id);

  return member?.role ?? 'USER';
};
