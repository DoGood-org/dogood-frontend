import {
  IBannedCurrentUser,
  ICurrentUser,
  Role,
  UserOrganization,
} from '@/types';
import { authStore } from '@/zustand/stores/authStore';

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
  user: ICurrentUser | IBannedCurrentUser | null
): Role => {
  if (!user) return 'GUEST';

  if ('isBanned' in user) {
    return 'GUEST';
  }

  const member = members.find(({ userId }) => userId === user.id);

  return member?.role ?? 'USER';
};
