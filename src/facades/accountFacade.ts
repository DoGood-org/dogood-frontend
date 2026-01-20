// import { useAuth } from '@/hooks';
import { useRedirectToLogin } from '@/hooks/useRedirectToLogin';
import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import { ICurrentUser } from '@/types';
import { cache } from 'react';

export const fetchCurrentUser = cache(
  async (): Promise<ICurrentUser | null> => {
    const user = await getServerCurrentUser();
    // const { user } = useAuth();

    if (!user) {
      useRedirectToLogin();
      return null;
    } else {
      return user;
    }
  }
);
