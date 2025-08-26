// 'use client';

import React, { JSX } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SwiperList } from '@/components';
// import { mockNews } from '@/components/main/news/mockNews';
// import { useTranslations } from 'next-intl';

import { LinkWithArrow } from '@/components/ui/LinkWithArrow';
import { Section } from '@/components/ui/Section';
import { getNews } from '@/services/newsService';
import { getTranslations } from 'next-intl/server';
import { INewsItem } from '@/types';

export const NewsList = async (): Promise<JSX.Element> => {
  const t = await getTranslations('news');

  let news: INewsItem[] = [];
  try {
    const fetchedNews = await getNews();
    console.log(fetchedNews);
    if (Array.isArray(fetchedNews)) {
      news = fetchedNews;
    } else if (fetchedNews) {
      news = [fetchedNews];
    }
  } catch (error) {
    console.error('Failed to fetch news:', error);
  }

  return (
    <Section
      withContainer={true}
      className=" mx-auto w-full bg-background text-foreground py-[40px]"
    >
      <h2
        className="text-foreground text-h2 font-normal
        lg:text-h2-d
        "
      >
        {t('newsListMain.title')}
      </h2>

      <SwiperList
        newsItems={news}
        swiperContainerClass="h-[425px] my-10"
        prevClass="prevNews"
        nextClass="nextNews"
        paginationClass="news-pagination"
        bulletClass="news-pagination-bullet"
        bulletActiveClass="news-pagination-bullet-active"
      />

      <div className="mt-4 flex justify-end">
        <LinkWithArrow href="/news" text={t('newsListMain.seeAll')} />
      </div>
    </Section>
  );
};
