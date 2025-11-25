import { fetchFromApi, FetchSuccess } from '@/lib/apiFetcher';
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
  const res = response as FetchSuccess<INewsListApiResponse>;

  return res.data.data.posts;
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

  const res = response as FetchSuccess<INewsItemApiResponse>;

  return res.data?.data.post;
};
