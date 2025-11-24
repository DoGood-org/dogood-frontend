import { fetchFromApi } from '@/lib/apiFetcher';
import {
  DeleteOrgResponse,
  ProfileOrgFormData,
  ProfileOrgResponse,
} from '@/types/settings';

export const sendOrgProfile = async (
  formData: ProfileOrgFormData,
  orgId: string
): Promise<ProfileOrgResponse> => {
  const response = await fetchFromApi<ProfileOrgResponse>(
    `/organizations/${orgId}`,
    {
      method: 'PATCH',
      data: formData,
      auth: true,
    }
  );

  if (response.ok) {
    return response.data;
  } else {
    throw {
      status: 'error',
      message: response.errorMessage,
      data: null,
    };
  }
};

export const deleteOrgProfile = async (
  orgId: string
): Promise<DeleteOrgResponse> => {
  const response = await fetchFromApi<DeleteOrgResponse>(
    `/organizations/${orgId}`,
    {
      method: 'DELETE',
      auth: true,
    }
  );

  if (response.ok) {
    return response.data;
  } else {
    throw {
      status: 'error',
      message: response.errorMessage,
    };
  }
};
