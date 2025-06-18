'use client';

import { ArrowBigLeft, ArrowBigRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React, { JSX } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SwiperList } from '@/components/main/news/SwiperList';
import { mockNews } from '@/components/main/news/mockNews';
import { useTranslations } from 'next-intl';
import { SwiperPagination } from '@/components/main/news/SwiperPagination';
import { SwiperNavButton } from '@/components/main/news/SwiperNavButton';

export const NewsList = (): JSX.Element => {
  const t = useTranslations('news');
  return (
    <section className=" mx-auto w-full bg-background text-[var(--foreground)] py-[40px] ">
      <div className="my-container">
        <h2
          className="text-[var(--foreground)] text-[32px] font-normal leading-12
        xl:text-[48px] xl:font-normal mb-4
        "
        >
          {t('newsListMain.title')}
        </h2>
        <div className="flex justify-between items-center mb-4">
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
        </div>

        <SwiperList
          newsItems={mockNews}
          swiperContainerClass="flex h-[1380px] my-[40px] sm:h-[480px]"
          prevClass="prevNews"
          nextClass="nextNews"
          paginationClass="news-pagination"
          bulletClass="news-pagination-bullet"
          bulletActiveClass="news-pagination-bullet-active"
        />

        <div
          className="mt-4 text-[16px] text-[var(--foreground)] text-left leading-6 
        md:text-right"
        >
          <Link href="/news" className="text-sm hover:underline">
            {t('newsListMain.seeAll')} <ArrowRight className="inline" />
          </Link>
        </div>
      </div>
    </section>
  );
};
