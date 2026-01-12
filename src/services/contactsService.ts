import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import { ContactFormData, ContactResponse } from '@/types/contact';

export const sendContact = async (
  formData: ContactFormData
): Promise<FetchResult<ContactResponse>> => {
  return fetchFromApi<ContactResponse>('/contact', {
    method: 'POST',
    data: formData,
    auth: false,
  });
};
