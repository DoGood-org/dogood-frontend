import { getUserById } from '@/services/publicUserService';
import { UserDetailedProps } from '@/types';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const fetchUserById = cache(
  async (userId: string): Promise<UserDetailedProps | null> => {
    const result = await getUserById(userId);

    if (!result.ok) notFound();
    return result.data.data.user;
  }
);
