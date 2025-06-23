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

export const NewsList = (): JSX.Element => {
  const t = useTranslations('news');
  return (
    <section className=" mx-auto w-full bg-background text-[var(--foreground)] py-[40px] ">
      <div className="my-container">
        <h2
          className="text-[var(--foreground)] text-[32px] font-normal leading-12 mb-4
        lg:text-[48px]
        "
        >
          {t('newsListMain.title')}
        </h2>
        {/* <div className="flex justify-between items-center mb-4">
          <div className=" flex gap-4">
            <SwiperPagination
              className="news-pagination flex gap-2"
              bulletClassName="news-pagination-bullet"
            />
          </div>
          <div className="flex gap-4">
            <SwiperNavButton
              className="prevNews"
              ariaLabel="Previous news"
              onClick={() => {}}
              icon={ArrowBigLeft}
            />
            <SwiperNavButton
              className="nextNews"
              ariaLabel="Next news"
              onClick={() => {}}
              icon={ArrowBigRight}
            />
          </div>
        </div> */}
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

        <div className=" mx-1 text-[16px] flex text-[var(--foreground)] justify-end leading-6 ">
          <LinkWithArrow
            href="/news"
            className="text-sm hover:underline"
            text={t('newsListMain.seeAll')}
          />
        </div>
      </div>
    </section>
  );
};
