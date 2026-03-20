import { AboutPage } from '@/components/aboutPage/AboutPage';
import { Tlocale } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: Tlocale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  return {
    title: t('aboutData.title'),
    description: t('aboutData.description'),
  };
}

const AboutPageMain: React.FC = () => {
  return <AboutPage />;
};

export default AboutPageMain;
