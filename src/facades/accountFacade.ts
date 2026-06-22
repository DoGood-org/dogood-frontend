import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import { ICurrentUser } from '@/types';
import { cache } from 'react';

export const fetchCurrentUser = cache(
  async (): Promise<ICurrentUser | null> => {
    const user = await getServerCurrentUser();

    if (!user) return null;

    if ('isBanned' in user) return null;

    return user;
  }
);
