'use client';

import { useRouter } from 'next/navigation';
import { refreshUserData } from '@/app/actions/userActions';

export function useOrganizationRefresh(): {
  refreshOrganizations: () => Promise<void>;
} {
  const router = useRouter();

  const refreshOrganizations = async (): Promise<void> => {
    try {
      await refreshUserData();

      router.refresh();
    } catch (error) {
      console.error('Failed to refresh organizations:', error);
    }
  };

  return { refreshOrganizations };
}
