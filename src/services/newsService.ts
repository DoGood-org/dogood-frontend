import api from '@/lib/api';
import { INewsItem, INewsItemApiResponse, INewsListApiResponse } from '@/types';
import { AxiosError } from 'axios';

export const getNews = async (): Promise<INewsItem[]> => {
  try {
    const response = await api.get<INewsListApiResponse>('/posts');
    return response.data.data.posts;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error('Network error. Please check your Internet connection.');
    }
  }
};

export const getNewsById = async (id: string | number): Promise<INewsItem> => {
  try {
    const response = await api.get<INewsItemApiResponse>(`/posts/${id}`);
    const { post } = response.data.data;

    if (!post) throw new Error('News item not found in API response.');

    return post;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;
      throw new Error(errorMessage);
    } else {
      throw new Error('Network error. Please check your Internet connection.');
    }
  }
};
