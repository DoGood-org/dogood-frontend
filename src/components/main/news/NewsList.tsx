import NewsItem from '@/components/main/news/NewsItem';
import { INewsItem } from '@/types/news.interface';
import { ArrowDownToDot, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const newsMock: INewsItem[] = [
  {
    id: 'news_1',
    title: 'Kindness That Speaks Without Words',
    img: '/news/news1.png',
    date: '2023-10-01T12:00:00Z',
    tags: ['kindness', 'community'],
    category: 'Community',
  },
  {
    id: 'news_2',
    title: 'The Hidden Side of Healthcare: The Role of Giving',
    img: '/news/news2.png',
    date: '2023-10-02T12:00:00Z',
    tags: ['healthcare', 'giving'],
    category: 'Healthcare',
  },
  {
    id: 'news_3',
    title: 'When Helping Isn’t a Trend — It’s a Daily Choice',
    img: '/news/news3.png',
    date: '2023-10-03T12:00:00Z',
    tags: ['helping', 'choice'],
    category: 'Lifestyle',
  },
  {
    id: 'news_4',
    title: 'Kindness That Speaks Without Words Part 2',
    img: '/news/news1.png',
    date: '2023-10-01T12:00:00Z',
    tags: ['kindness', 'community'],
    category: 'Community',
  },
  {
    id: 'news_5',
    title: 'The Hidden Side of Healthcare: The Role of Giving Part 2',
    img: '/news/news2.png',
    date: '2023-10-02T12:00:00Z',
    tags: ['healthcare', 'giving'],
    category: 'Healthcare',
  },
  {
    id: 'news_6',
    title: 'When Helping Isn’t a Trend — It’s a Daily Choice Part 2',
    img: '/news/news3.png',
    date: '2023-10-03T12:00:00Z',
    tags: ['helping', 'choice'],
    category: 'Lifestyle',
  },
];

export const NewsList: React.FC = () => {
  const lengthNewsToDisplay = 3;

  if (!newsMock || newsMock.length === 0) {
    return <div>No news available</div>;
  }

  return (
    <section className="dark mx-auto w-full text-[var(--foreground)] py-[40px] ">
      <div className="my-container">
        <h2 className="mb-[40px] text-[var(--foreground)] text-[32px] font-normal leading-12">
          Last news, stories and blog posts
        </h2>
        <ul className="news-list gap-[24px] px-[20px] flex flex-col justify-center items-center sm:flex-row sm:overflow-auto">
          {newsMock.map((item) => (
            <NewsItem key={item.id} item={item} />
          ))}
        </ul>
   

        <div className="mt-4 text-[16px] text-[var(--foreground)] text-left leading-6">
          <Link href="/news" className="text-sm hover:underline">
            See all news <ArrowRight className="inline" />
          </Link>
        </div>
      </div>
    </section>
  );
};
