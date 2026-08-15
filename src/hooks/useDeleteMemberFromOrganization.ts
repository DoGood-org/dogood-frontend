import { FetchResult } from '@/lib/api/apiFetcher';
import { removeMemberFromOrganization } from '@/services/organizationService';
import { DeleteMemberResponse, IDeleteMemberOrgRequest } from '@/types';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { ApiError } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const useDeleteMemberFromOrganization = (): UseMutationResult<
  FetchResult<DeleteMemberResponse>,
  ApiError,
  IDeleteMemberOrgRequest,
  unknown
> => {
  const router = useRouter();
  const t = useTranslations('organization.memberModals');

  return useMutation({
    mutationFn: removeMemberFromOrganization,

    onSuccess: () => {
      toast.info(t('memberRemoved'));
      router.refresh();
    },

    onError: () => {
      toast.error(t('memberRemoveError'));
    },
  });
};
