import { fetchFromApi, FetchResult } from '@/lib/apiFetcher';
import { INewsItemApiResponse, INewsListApiResponse, Tlocale } from '@/types';

export const getNews = async (
  locale: Tlocale
): Promise<FetchResult<INewsListApiResponse>> => {
  return fetchFromApi<INewsListApiResponse>(`/posts/${locale}`, {
    method: 'GET',
  });
};

export const getNewsById = async (
  id: string | number,
  locale: Tlocale
): Promise<FetchResult<INewsItemApiResponse>> => {
  return fetchFromApi<INewsItemApiResponse>(`/posts/${id}/${locale}`, {
    method: 'GET',
  });
};
