'use client';
import React from 'react';
import { INewsItem } from '@/types/news.interface';
import { NewsItem } from '@/components';

interface NewsListItemsProps {
  newsItems: INewsItem[];
}

export const NewsListItems: React.FC<NewsListItemsProps> = ({ newsItems }) => {
  if (!newsItems || newsItems.length === 0) {
    return (
      <p className="text-left h-[425px] text-gray-500 py-10">No news yet 📰</p>
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
