import api from '@/lib/api';
import {
  INewsItem,
  INewsItemApiResponse,
  INewsListApiResponse,
  Tlocale,
} from '@/types';

export const getNews = async (locale: Tlocale): Promise<INewsItem[]> => {
  const response = await api.guest.get<INewsListApiResponse>('/posts', {
    params: {
      lang: locale,
    },
  });
  return response.data?.data?.posts ?? [];
};

export const getNewsById = async (
  id: string | number,
  locale: string
): Promise<INewsItem> => {
  const response = await api.guest.get<INewsItemApiResponse>(`/posts/${id}`, {
    params: {
      lang: locale,
    },
  });
  const { post } = response.data.data;

  if (!post) throw new Error('News item not found in API response.');

  return post;
};
