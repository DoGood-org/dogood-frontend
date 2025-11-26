import React, { JSX } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SwiperList } from '@/components/main/news/SwiperList';

import { LinkWithArrow } from '@/components/ui/LinkWithArrow';
import { Section } from '@/components/ui/Section';
import { getLocale, getTranslations } from 'next-intl/server';
import { fetchNews } from '@/facades/newsFacade';
import { Tlocale } from '@/types';

export const NewsList = async (): Promise<JSX.Element> => {
  const locale = (await getLocale()) as Tlocale;
  const t = await getTranslations('news');
  const newsResult = await fetchNews(locale);
  const error = !newsResult.ok;

  const newsItems = !error ? newsResult.data.data.posts : [];

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

      {error ? (
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-sm">{t('news.loadError')}</p>
        </div>
      ) : (
        <>
          <SwiperList
            newsItems={newsItems}
            swiperContainerClass="h-[425px] my-10"
            prevClass="prevNews"
            nextClass="nextNews"
            paginationClass="news-pagination"
            bulletClass="news-pagination-bullet"
            bulletActiveClass="news-pagination-bullet-active"
          />
        </>
      )}
      <div className="mt-4 flex justify-end">
        <LinkWithArrow href="/news" text={t('newsListMain.seeAll')} />
      </div>
    </Section>
  );
};
