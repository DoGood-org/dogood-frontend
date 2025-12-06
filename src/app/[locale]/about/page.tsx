import { AboutPage } from '@/components/aboutPage/AboutPage';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: { locale: string };
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
