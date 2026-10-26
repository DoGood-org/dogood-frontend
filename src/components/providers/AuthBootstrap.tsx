'use client';

import { useEffect } from 'react';
import { authStore } from '@/zustand/stores/authStore';

const MIN_INTERVAL_MS = 30_000;

let inFlight: Promise<unknown> | null = null;
let lastRunAt = 0;

function refreshSilently(force = false): void {
  const { isLoggedIn, currentUser } = authStore.getState();
  if (!isLoggedIn) return;
  if (inFlight) return;
  if (!force && Date.now() - lastRunAt < MIN_INTERVAL_MS) return;

  lastRunAt = Date.now();
  inFlight = Promise.resolve(currentUser({ silent: true })).finally(() => {
    inFlight = null;
  });
}

export function AuthBootstrap(): null {
  useEffect(() => {
    const onVisibility = (): void => {
      if (document.visibilityState === 'visible') refreshSilently();
    };

    refreshSilently(true);
    document.addEventListener('visibilitychange', onVisibility);

    return (): void => {
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return null;
}
