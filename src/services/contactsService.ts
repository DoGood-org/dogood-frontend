import api from '@/lib/api';
import { ContactFormData, ContactResponse } from '@/types/contact';

export const sendContact = async (
  formData: ContactFormData
): Promise<ContactResponse> => {
  const response = await api.guest.post<ContactResponse>('/contact', formData);
  return response.data;
};
