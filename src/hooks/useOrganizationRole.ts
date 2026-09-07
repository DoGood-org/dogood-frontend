import { getUserRoleFromMembers } from '@/lib/getUserRole';
import { Role, UserOrganization } from '@/types';
import { authStore } from '@/zustand/stores/authStore';

export const useOrganizationRole = (members: UserOrganization[]): Role => {
  const user = authStore((s) => s.user);

  return getUserRoleFromMembers(members, user);
};
