import { FetchResult } from '@/lib/api/apiFetcher';
import { removeMemberFromOrganization } from '@/services/organizationService';
import { DeleteMemberResponse, IDeleteMemberOrgRequest } from '@/types';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

export const useDeleteMemberFromOrganization = (): UseMutationResult<
  FetchResult<DeleteMemberResponse>,
  ApiError,
  IDeleteMemberOrgRequest,
  unknown
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: removeMemberFromOrganization,
    onSuccess: () => {
      router.refresh();
    },
  });
};
