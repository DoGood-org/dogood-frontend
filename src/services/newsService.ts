import api from '@/lib/api';
import { INewsApiResponse, INewsItem } from '@/types';
import { AxiosError } from 'axios';

export const getNews = async (): Promise<INewsItem[]> => {
  try {
    const response = await api('/posts');
    const newsApiResponse: INewsApiResponse = response.data;
    return newsApiResponse.data.posts;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error('Network error. Please check your Internet connection.');
    }
  }
};
