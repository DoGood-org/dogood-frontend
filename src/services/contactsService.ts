import { fetchFromApi } from '@/lib/apiFetcher';
import { ContactFormData, ContactResponse } from '@/types/contact';

export const sendContact = async (
  formData: ContactFormData
): Promise<ContactResponse> => {
  const response = await fetchFromApi<ContactResponse>('/contact', {
    method: 'POST',
    data: formData,
  });
  return response;
};
