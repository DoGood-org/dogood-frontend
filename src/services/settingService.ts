import { fetchFromApi } from '@/lib/apiFetcher';
import { SettingsFormData, SettingsResponse } from '@/types/settings';

export const sendProfile = async (
  formData: SettingsFormData
): Promise<SettingsResponse> => {
  const response = await fetchFromApi<SettingsResponse>('/profile', {
    method: 'PUT',
    data: formData,
    auth: true,
  });
  return response;
};
