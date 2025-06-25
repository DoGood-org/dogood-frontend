import { mockNews } from '@/components';
import type { JSX } from 'react/jsx-runtime'; // ✅ correct
import type { Tlocale } from '@/types/locale';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

interface Props {
  params: Promise<{ slug: string; locale: Tlocale }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });

  const newsItem = mockNews.find((item) => item.id === slug);

  if (!newsItem) {
    return {
      title: t('newsItemPage.notFoundTitle'),
      description: t('newsItem.notFoundDescription'),
    };
  }

  return {
    title: t('newsItemPageMeta.title', {
      title: newsItem.title,
    }),
    description: t('newsItemPageMeta.description', {
      title: newsItem.title,
    }),
  };
}

export default async function IdNewsItemPage({
  params,
}: Props): Promise<JSX.Element> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });

  const newsItem = mockNews.find((item) => item.id === slug);

  if (!newsItem) {
    return (
      <div>
        <h1>{t('newsItem.notFoundTitle')}</h1>
        <p>{t('newsItem.notFoundDescription')}</p>
      </div>
    );
  }

  return (
    <div
      className=" 
bg-[var(--background)]
    px-[4px]
    pt-[168px]
pb-[64px]
my-container
w-full
min-h-[calc(100dvh-188px)]
text-foreground
flex
flex-col
items-center
justify-center
"
    >
      <h2 className="text-foreground">
        {t('newsItemPage.title', { title: newsItem.title })}
      </h2>
      <p className="text-foreground">{newsItem.date}</p>
      <p className="text-foreground">{newsItem.title}</p>
      <Image
        src={newsItem.img}
        alt={newsItem.title}
        className="w-full h-auto max-w-[600px] mb-4"
        width={600}
        height={400}
      />
    </div>
  );
}
