import { INewsItem, Tlocale } from '@/types';
import { getNews } from '@/services/newsService';

export const fetchNews = async (locale: Tlocale): Promise<INewsItem[]> => {
  return await getNews(locale);
};
