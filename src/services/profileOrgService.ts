import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import { DeleteOrgResponse, ProfileOrgFormData } from '@/types/settings';

export const sendOrgProfile = async (
  formData: ProfileOrgFormData,
  orgId: string
): Promise<FetchResult<ProfileOrgFormData>> => {
  return fetchFromApi<ProfileOrgFormData>(`/organization/${orgId}`, {
    method: 'PATCH',
    data: formData,
    auth: true,
  });
};

export const createOrg = async (
  formData: ProfileOrgFormData
): Promise<FetchResult<ProfileOrgFormData>> => {
  return fetchFromApi<ProfileOrgFormData>('/organization/create', {
    method: 'POST',
    data: formData,
    auth: true,
  });
};

export const deleteOrgProfile = async (
  orgId: string
): Promise<FetchResult<DeleteOrgResponse>> => {
  return fetchFromApi(`/organization/${orgId}`, {
    method: 'DELETE',
    auth: true,
  });
};
