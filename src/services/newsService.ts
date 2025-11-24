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
  if (!response.ok) {
    console.error('Помилка при завантаженні новин', (response as any).message);
    return [];
  }
  return response.data.data?.posts;
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

  if (!response.ok) {
    console.error('Помилка при завантаженні новини', (response as any).message);
    throw new Error('News item not found in API response.');
  }

  return response.data.data.post;
};
