'use client';

import { INewsItem } from '@/types';
import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { LinkWithArrow } from '@/components/ui/LinkWithArrow';
import { NewsListItems } from './NewsListItems';
import { useMediaQuery } from '@/hooks';

interface LastNewsProps {
  newsItems?: INewsItem[];
}

export const LastNews = ({ newsItems = [] }: LastNewsProps): JSX.Element => {
  const t = useTranslations('news');

  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1439px)');
  const maxItems = isDesktop ? 4 : isTablet ? 2 : 1;

  const sortedNews = [...newsItems].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
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
