import { getUserById } from '@/services/publicUserService';
import { UserDetailedProps } from '@/types';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const fetchUserById = cache(
  async (userId: string): Promise<UserDetailedProps | null> => {
    const user = await getUserById(userId);

    if (!user) notFound();
    return user;
  }
);
