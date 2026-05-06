'use server';

import { revalidatePath } from 'next/cache';
import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import { ICurrentUser } from '@/types';

export async function refreshUserData(): Promise<ICurrentUser | null> {
  revalidatePath('/account');

  const user = await getServerCurrentUser();

  return user;
}
