import { INewsListApiResponse, Tlocale } from '@/types';
import { getNews } from '@/services/newsService';
import { FetchResult } from '@/lib/apiFetcher';

export const fetchNews = async (
  locale: Tlocale
): Promise<FetchResult<INewsListApiResponse>> => {
  return await getNews(locale);
};
