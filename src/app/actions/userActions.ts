'use server';

import { revalidatePath } from 'next/cache';
import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import { ICurrentUser } from '@/types';

export async function refreshUserData(): Promise<ICurrentUser | null> {
  revalidatePath('/account');

  const user = await getServerCurrentUser();

  if (!user) return null;

  if ('isBanned' in user) return null;

  return user;
}
