import { fetchFromApi } from '@/lib/apiFetcher';
import { SettingsOrgFormData, SettingsOrgResponse } from '@/types/settings';

export const sendOrgProfile = async (
  formData: SettingsOrgFormData
): Promise<SettingsOrgResponse> => {
  const response = await fetchFromApi<SettingsOrgResponse>('/profile', {
    method: 'PUT',
    data: formData,
    auth: true,
  });
  return response;
};
