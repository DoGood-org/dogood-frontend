import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import { ProfileFormData } from '@/types/settings';

export const sendProfile = async (
  formData: ProfileFormData
): Promise<FetchResult<ProfileFormData>> => {
  return fetchFromApi<ProfileFormData>('/profile', {
    method: 'PUT',
    data: formData,
    auth: true,
  });
};
