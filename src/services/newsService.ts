import { fetchFromApi } from '@/lib/apiFetcher';
import {
  INewsItem,
  INewsItemApiResponse,
  INewsListApiResponse,
  Tlocale,
} from '@/types';

export const getNews = async (locale: Tlocale): Promise<INewsItem[]> => {
  const response = await fetchFromApi<INewsListApiResponse>('/posts', {
    method: 'GET',
    params: {
      lang: locale,
    },
  });
  return response.data?.posts ?? [];
};

export const getNewsById = async (
  id: string | number,
  locale: string
): Promise<INewsItem> => {
  const response = await fetchFromApi<INewsItemApiResponse>(`/posts/${id}`, {
    method: 'GET',
    params: {
      lang: locale,
    },
  });
  const { post } = response.data;

  if (!post) throw new Error('News item not found in API response.');

  return post;
};
