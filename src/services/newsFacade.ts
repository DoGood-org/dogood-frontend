import { INewsItem } from '@/types';
import { getNews } from './newsService';

export const fetchNews = async (locale: string): Promise<INewsItem[]> => {
  try {
    const news = await getNews(locale);
    return Array.isArray(news) ? news : news ? [news] : [];
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
};
