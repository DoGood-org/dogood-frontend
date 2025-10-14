'use client';

import { INewsItem } from '@/types';
import { JSX } from 'react';
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

  const slicedNews = sortedNews.slice(0, maxItems);

  return (
    <section>
      <h2 className="text-h2 font-normal">Latest News</h2>
      <NewsListItems newsItems={slicedNews} />
      <div className="mt-4 flex justify-end">
        <LinkWithArrow href="/news" text="Last news, stories and blog posts" />
      </div>
    </section>
  );
};
