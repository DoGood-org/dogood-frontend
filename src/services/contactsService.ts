import api from '@/lib/api';
import { ContactFormData, ContactResponse } from '@/types/contact';
import { AxiosError } from 'axios';

export const sendContact = async (
  formData: ContactFormData
): Promise<ContactResponse> => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error('Network error. Please check your Internet connection.');
    }
  }
};
