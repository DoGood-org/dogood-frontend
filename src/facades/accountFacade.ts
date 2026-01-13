// import { useAuth } from '@/hooks';
import { useRedirectToLogin } from '@/hooks/useRedirectToLogin';
import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import { UserDetailedProps } from '@/types';
import { cache } from 'react';

export const fetchCurrentUser = cache(
  async (): Promise<UserDetailedProps | > => {
    const user = await getServerCurrentUser();
    // const { user } = useAuth();

    if (!user) {
      useRedirectToLogin();
    } else {
      return user;
    }
  }
);
