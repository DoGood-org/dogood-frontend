import { SupportPage } from '@/components/supportPage/SupportPage';
import { Tlocale } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

interface Props {
  params: Promise<{ locale: Tlocale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'supportPage' });
  return {
    title: t('supportData.title'),
    description: t('supportData.description'),
  };
}

const SupportMainPage: React.FC = () => {
  return <SupportPage />;
};

export default SupportMainPage;
