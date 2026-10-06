import { ApiError, FetchResult } from '@/lib/api/apiFetcher';
import { updateMemberRole } from '@/services/organizationService';
import { AddMemberResponse, UpdateMemberRoleRequest } from '@/types';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useUpdateMemberRole = (): UseMutationResult<
  FetchResult<AddMemberResponse>,
  ApiError,
  UpdateMemberRoleRequest,
  unknown
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: updateMemberRole,
    onSuccess: () => {
      router.refresh();
    },
  });
};
