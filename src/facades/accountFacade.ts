import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import { ICurrentUser } from '@/types';
import { cache } from 'react';

export const fetchCurrentUser = cache(
  async (): Promise<ICurrentUser | null> => {
    return await getServerCurrentUser();
  }
);
