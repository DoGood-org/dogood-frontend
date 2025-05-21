import { useTranslations } from 'next-intl';
import React from 'react';
import { LearnIcon } from '@/components/icons';
import Footer from '@/components/footer/footer';
export default function Home() {
  const t = useTranslations('common');
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"></main>
      <h1>{t('title')}</h1>
      <Footer />
      <LearnIcon />
    </div>
  );
}
