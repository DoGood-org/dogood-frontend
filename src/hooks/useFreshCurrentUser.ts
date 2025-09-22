// useAuthAutoRefresh.ts
import { useEffect } from 'react';
import { authStore } from '@/zustand/stores/authStore';

export function useFreshCurrentUser(): void {
  const { refresh } = authStore();
  useEffect(() => {
    const refreshCurrentUser = (): Promise<void> => refresh().catch(() => {});
    window.addEventListener('focus', refreshCurrentUser);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') refreshCurrentUser();
    });
    return (): void => {
      window.removeEventListener('focus', refreshCurrentUser);
      document.removeEventListener('visibilitychange', refreshCurrentUser);
    };
  }, []);
}
