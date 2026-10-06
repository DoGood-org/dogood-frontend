'use client';

import { createContext, JSX, useContext } from 'react';
import { Role } from '@/types';

const UserRoleContext = createContext<Role>('GUEST');

export const useUserRole = (): Role => useContext(UserRoleContext);

export const UserRoleProvider = ({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <UserRoleContext.Provider value={role}>{children}</UserRoleContext.Provider>
  );
};
