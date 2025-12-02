'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { INewsItem } from '@/types';
import { NewsItem } from '@/components/main/news/NewsItem';

interface NewsListItemsProps {
  newsItems: INewsItem[];
}

export const NewsListItems: React.FC<NewsListItemsProps> = ({ newsItems }) => {
  const t = useTranslations('news');

  if (!newsItems || newsItems.length === 0) {
    return (
      <p className="text-left h-[425px] text-gray-500 py-10">
        {t('news.noNews')}
      </p>
    );
  }
  return (
    <div className="flex gap-4 flex-wrap mb-10">
      {newsItems.map((item) => (
        <NewsItem key={item.id} item={item} />
      ))}
    </div>
  );
};
