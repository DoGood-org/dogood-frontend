import { fetchFromApi, FetchResult } from '@/lib/apiFetcher';
import { DeleteOrgResponse, ProfileOrgFormData } from '@/types/settings';

export const sendOrgProfile = async (
  formData: ProfileOrgFormData,
  orgId: string
): Promise<FetchResult<ProfileOrgFormData>> => {
  return fetchFromApi<ProfileOrgFormData>(`/organizations/${orgId}`, {
    method: 'PATCH',
    data: formData,
    auth: true,
  });
};

export const deleteOrgProfile = async (
  orgId: string
): Promise<FetchResult<DeleteOrgResponse>> => {
  return fetchFromApi(`/organizations/${orgId}`, {
    method: 'DELETE',
    auth: true,
  });
};
