import { GrantsPage } from '@/components/grantsPage/GrantsPage';
import { Tlocale } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

interface Props {
  params: Promise<{ locale: Tlocale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'grantsPage' });
  return {
    title: t('grantsData.title'),
    description: t('grantsData.description'),
  };
}
const GrantsMainPage: React.FC = () => {
  return <GrantsPage />;
};
export default GrantsMainPage;
