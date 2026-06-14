import { CurrentUserResult } from '@/types';
import { headers } from 'next/headers';
import { cache } from 'react';

export const getServerCurrentUser = cache(
  async (): Promise<CurrentUserResult> => {
    const h = await headers();
    const cookie = h.get('cookie') ?? '';

    const cleanBackend = process.env.NEXT_PUBLIC_API_URL!.replace(/\/+$/, '');

    const res = await fetch(`${cleanBackend}/auth/current-user`, {
      headers: {
        Cookie: cookie,
      },
      cache: 'no-store',
    });

    if (res.status === 403) {
      try {
        const errorData = await res.json();
        if (errorData?.bannedUser) {
          return {
            isBanned: true,
            bannedUser: errorData.bannedUser,
          };
        }
      } catch {
        return null;
      }

      return null;
    }

    if (!res.ok) return null;

    const data = await res.json();
    return data.user ?? null;
  }
);
