'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  getJoinRequests,
  updateJoinRequestStatus,
} from '@/services/joinRequestService';
import { IJoinRequests, JoinRequestStatus } from '@/types/joinRequest.type';
import { useRouter } from 'next/navigation';

type UseJoinRequestsResult = {
  joinRequests: IJoinRequests[];
  isLoading: boolean;
  error: string | null;
  approve: (id: string) => Promise<void>;
  reject: (id: string) => Promise<void>;
  isError: boolean;
  refetch: () => Promise<void>;
};

export const useJoinRequests = (
  organizationId: string
): UseJoinRequestsResult => {
  const [joinRequests, setJoinRequests] = useState<IJoinRequests[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const loadJoinRequests = useCallback(async () => {
    if (!organizationId) return;

    setIsLoading(true);
    setError(null);

    const result = await getJoinRequests(organizationId);

    if (result.ok) {
      setJoinRequests(result.data);
    } else {
      setError(result.errorMessage);
    }

    setIsLoading(false);
  }, [organizationId]);

  const approve = async (id: string): Promise<void> => {
    const result = await updateJoinRequestStatus(
      id,
      JoinRequestStatus.ACCEPTED
    );

    if (result.ok) {
      await loadJoinRequests();
      router.refresh();
    }
  };

  const reject = async (id: string): Promise<void> => {
    const result = await updateJoinRequestStatus(
      id,
      JoinRequestStatus.REJECTED
    );

    if (result.ok) {
      await loadJoinRequests();
      router.refresh();
    }
  };

  useEffect(() => {
    void loadJoinRequests();
  }, [loadJoinRequests]);

  return {
    joinRequests,
    isLoading,
    error,
    approve,
    reject,
    isError: error !== null,
    refetch: loadJoinRequests,
  };
};
