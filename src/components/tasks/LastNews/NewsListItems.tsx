'use client';
import React from 'react';
import { INewsItem } from '@/types/news.interface';
import { NewsItem } from '@/components';

interface NewsListItemsProps {
  newsItems: INewsItem[];
}

export const NewsListItems: React.FC<NewsListItemsProps> = ({ newsItems }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {newsItems.map((item) => (
        <NewsItem key={item.id} item={item} />
      ))}
    </div>
  );
};
