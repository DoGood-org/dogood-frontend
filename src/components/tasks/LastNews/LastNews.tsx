'use client';

import { INewsItem } from '@/types';
import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { LinkWithArrow } from '@/components/ui/LinkWithArrow';
import { NewsListItems } from './NewsListItems';

interface LastNewsProps {
  newsItems?: INewsItem[];
  maxItems?: number;
}

export const LastNews = ({
  newsItems = [],
  maxItems = 4,
}: LastNewsProps): JSX.Element => {
  const sortedNews = [...newsItems].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  const t = useTranslations('news');

  const slicedNews = sortedNews.slice(0, maxItems);

  return (
    <section className="py-10">
      <h2 className="text-h2 lg:text-h3-d mb-10">{t('newsListMain.title')}</h2>
      <NewsListItems newsItems={slicedNews} />
      <div className="mt-4 flex justify-start lg:justify-end">
        <LinkWithArrow href="/news" text={t('newsListMain.seeAll')} />
      </div>
    </section>
  );
};
