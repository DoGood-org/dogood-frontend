'use client';
import { NotFoundComponent, Section } from '@/components';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import NotFoundDesk from '@/assets/images/notFound/notFoundDesk.png';
import NotFoundTabl from '@/assets/images/notFound/notFoundTabl.png';
import NotFoundMob from '@/assets/images/notFound/notFoundmob.png';
import { useTranslations } from 'next-intl';

export default function NotFound(): React.JSX.Element {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1440px)');
  const t = useTranslations('common');

  const heroImage = isMobile
    ? NotFoundMob
    : isTablet
      ? NotFoundTabl
      : NotFoundDesk;

  return (
    <Section className="lg:pt-[200px]">
      <NotFoundComponent
        scrImg={heroImage}
        title={t('notFoundTitle')}
        description={t('notFoundDescr')}
        className="mb-8 lg:mb-10"
      />
      {/* <Link href="/">Return Home</Link> */}
    </Section>
  );
}
