import { ApiError, FetchResult } from '@/lib/api/apiFetcher';
import { addMemberToOrganization } from '@/services/organizationService';
import { AddMemberResponse, IAddMemberOrgRequest, UserShort } from '@/types';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const useAddMemberToOrganization = (
  debouncedQuery: string
): UseMutationResult<
  FetchResult<AddMemberResponse>,
  ApiError,
  IAddMemberOrgRequest,
  unknown
> => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('organization');

  return useMutation({
    mutationFn: addMemberToOrganization,

    onSuccess: (_, variables) => {
      queryClient.setQueryData<UserShort[]>(
        ['user-search', debouncedQuery],
        (old) => old?.filter((u) => u.id !== variables.userId)
      );

      router.refresh();
    },
    onError: () => {
      toast.error(t('memberInviteError'));
    },
  });
};
