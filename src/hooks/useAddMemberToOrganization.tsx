// src/hooks/useAddMemberToOrganization.ts
// import { FetchResult } from '@/lib/api/apiFetcher';
import { ApiError, FetchResult } from '@/lib/api/apiFetcher';
import { addMemberToOrganization } from '@/services/organizationService';
import { AddMemberResponse, IAddMemberOrgRequest, UserShort } from '@/types';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// type AddMemberResponse = {
//   id: string;
// };

// : UseMutationResult<AddMemberResponse, ApiError, AddMemberPayload>

export const useAddMemberToOrganization = (
  // organizationId: string,
  debouncedQuery: string
): UseMutationResult<
  FetchResult<AddMemberResponse>,
  ApiError,
  IAddMemberOrgRequest,
  unknown
> => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: addMemberToOrganization,
    onSuccess: (_, variables) => {
      // прибираємо юзера з пошуку
      queryClient.setQueryData<UserShort[]>(
        ['user-search', debouncedQuery],
        (old) => old?.filter((u) => u.id !== variables.userId)
      );

      // інвалідовуємо мемберів організації
      router.refresh();
      // queryClient.invalidateQueries({
      //   queryKey: ['organization-members', organizationId],
      // });
    },
  });
};
