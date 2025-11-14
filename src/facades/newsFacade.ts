import { INewsItem, Tlocale } from '@/types';
import { getNews } from '@/services/newsService';

export const fetchNews = async (locale: Tlocale): Promise<INewsItem[]> => {
  try {
    const news = await getNews(locale);
    return news;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
};
