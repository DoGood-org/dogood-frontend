import { fetchFromApi } from '@/lib/apiFetcher';
import {
  INewsItem,
  INewsItemApiResponse,
  INewsListApiResponse,
  Tlocale,
} from '@/types';

export const getNews = async (locale: Tlocale): Promise<INewsItem[]> => {
  const response = await fetchFromApi<INewsListApiResponse>(
    `/posts/${locale}`,
    {
      method: 'GET',
    }
  );
  return response.data?.posts ?? [];
};

export const getNewsById = async (
  id: string | number,
  locale: string
): Promise<INewsItem> => {
  const response = await fetchFromApi<INewsItemApiResponse>(
    `/posts/${id}/${locale}`,
    {
      method: 'GET',
    }
  );
  const { post } = response.data;

  if (!post) throw new Error('News item not found in API response.');

  return post;
};
