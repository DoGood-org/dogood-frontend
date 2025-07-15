'use client';
import { ContactForm, NotFoundComponent, Section } from '@/components';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import NotFoundDesk from '@/assets/images/notFound/notFoundDesk.png';
import NotFoundTabl from '@/assets/images/notFound/notFoundTabl.png';
import NotFoundMob from '@/assets/images/notFound/notFoundmob.png';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

export default function NotFound(): React.JSX.Element {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1440px)');
  const t = useTranslations('common');
  const localActive = useLocale();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const heroImage = isMobile
    ? NotFoundMob
    : isTablet
      ? NotFoundTabl
      : NotFoundDesk;

  const handleContactBtn = (): void => {
    setIsContactOpen(!isContactOpen);
  };

  return (
    <Section className="pt-[80px] lg:pt-[200px] min-h-dvh">
      <NotFoundComponent
        scrImg={heroImage}
        title={t('notFoundTitle')}
        description={t('notFoundDescr')}
        text={t('notFoundText')}
        variantBtn1="primary"
        hrefBtn1={`${localActive}/`}
        variantBtn2="secondary"
        hrefBtn2={`${localActive}/`} //TODO: Add a link to Contact us page
        nameBtn1={t('backHomeBtn')}
        nameBtn2={t('contactUsBtn')}
        handleContactBtn={handleContactBtn}
      />
      {isContactOpen && <ContactForm />}
    </Section>
  );
}
