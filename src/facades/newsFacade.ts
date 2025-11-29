import { getNewsById } from '@/services/newsService';
import { INewsItem, Tlocale } from '@/types';
import { cache } from 'react';

export const fetchNewsItem = cache(
  async (slug: string, locale: Tlocale): Promise<INewsItem | null> => {
    const result = await getNewsById(slug, locale);

    if (!result.ok) {
      return null;
    }

    return result.data?.data?.post ?? null;
  }
);
