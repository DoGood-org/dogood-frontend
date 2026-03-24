// import { ROLE_PERMISSIONS } from './rolePermissions';
// import { Permission } from './permissions';

import { ROLE_PERMISSIONS } from '@/constants/roleConfig';
import { Permission, Role } from '@/types';

export const hasPermission = (role: Role, permission: Permission): boolean => {
  return (
    ROLE_PERMISSIONS[role as Exclude<Role, 'GUEST'>]?.includes(permission) ??
    false
  );
};
