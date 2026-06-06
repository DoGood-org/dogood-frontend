import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import { ProfileFormData } from '@/types/settings';

export const sendProfile = async (
  formData: ProfileFormData
): Promise<FetchResult<ProfileFormData>> => {
  return fetchFromApi<ProfileFormData>('/user/profile', {
    method: 'PATCH',
    data: formData,
    auth: true,
  });
};
