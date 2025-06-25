'use client';

import React, { JSX } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SwiperList } from '@/components/main/news/SwiperList';
import { mockNews } from '@/components/main/news/mockNews';
import { useTranslations } from 'next-intl';

import { LinkWithArrow } from '@/components/ui/LinkWithArrow';
import { NewsSlideTablet } from '@/components/main/news/NewsSlideTablet';
import { Section } from '@/components/ui/Section';

export const NewsList = (): JSX.Element => {
  const t = useTranslations('news');
  return (
    <Section
      withContainer={true}
      className=" mx-auto w-full bg-background text-foreground py-[40px]"
    >
      <h2
        className="text-foreground text-[32px] font-normal leading-12 mb-4
        lg:text-[48px]
        "
      >
        {t('newsListMain.title')}
      </h2>

      <SwiperList
        newsItems={mockNews}
        swiperContainerClass="h-[1323px] my-10 md:hidden lg:block lg:h-[425px] "
        prevClass="prevNews"
        nextClass="nextNews"
        paginationClass="news-pagination"
        bulletClass="news-pagination-bullet"
        bulletActiveClass="news-pagination-bullet-active"
      />
      <NewsSlideTablet
        newsItems={mockNews}
        containerClass="my-10 md:block lg:hidden"
      />

      <div className="mt-4 flex justify-end">
        <LinkWithArrow href="/news" text={t('newsListMain.seeAll')} />
      </div>
    </Section>
  );
};
