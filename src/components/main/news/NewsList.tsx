import React, { JSX } from 'react';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { SwiperList } from '@/components/main/news/SwiperList';

import { LinkWithArrow } from '@/components/ui/LinkWithArrow';
import { Section } from '@/components/ui/Section';
import { getLocale, getTranslations } from 'next-intl/server';
import { fetchNews } from '@/facades/newsFacade';
import { Tlocale } from '@/types';
import { NewsScrollList } from '@/components';

export const NewsList = async (): Promise<JSX.Element> => {
  const locale = (await getLocale()) as Tlocale;
  const t = await getTranslations('news');
  const newsResult = await fetchNews(locale);

  if (!newsResult.ok) {
    return <p>{t('news.loadError')}</p>;
  }

  const newsItems = newsResult.data.data.posts;

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

      <NewsScrollList newsItems={newsItems} />

      <div className="mt-4 flex justify-end">
        <LinkWithArrow href="/news" text={t('newsListMain.seeAll')} />
      </div>
    </Section>
  );
};
