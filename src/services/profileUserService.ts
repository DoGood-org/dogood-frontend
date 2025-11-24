import { fetchFromApi } from '@/lib/apiFetcher';
import { ProfileFormData, ProfileResponse } from '@/types/settings';

export const sendProfile = async (
  formData: ProfileFormData
): Promise<ProfileResponse> => {
  const response = await fetchFromApi<ProfileResponse>('/profile', {
    method: 'PUT',
    data: formData,
    auth: true,
  });
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
