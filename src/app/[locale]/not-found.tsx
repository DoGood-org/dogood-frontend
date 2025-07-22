'use client';
import { ContactForm, NotFoundComponent, Section } from '@/components';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import NotFoundDesk from '@/assets/images/notFound/notFoundDesk.png';
import NotFoundTabl from '@/assets/images/notFound/notFoundTabl.png';
import NotFoundMob from '@/assets/images/notFound/notFoundmob.png';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Close } from '@/components/icons';

export default function NotFound(): React.JSX.Element {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1440px)');
  const t = useTranslations('common');
  const c = useTranslations('faq');
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

  const downText = (c.raw('downtext') as any[])[0];
  const contact = (c.raw('contact') as any[])[0];

  useEffect(() => {
    if (isContactOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return (): void => document.body.classList.remove('overflow-hidden');
  }, [isContactOpen]);

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
        nameBtn1={t('backHomeBtn')}
        nameBtn2={t('contactUsBtn')}
        handleContactBtn={handleContactBtn}
      />
      {isContactOpen && (
        <div className="fixed inset-0 w-screen h-screen z-[9991] flex items-center justify-center bg-text-help/90 overflow-y-auto py-40">
          <div className="my-container bg-background pt-10 pb-10 relative mx-auto rounded-xl">
            <ContactForm
              buttonTxt={downText.contactUs}
              title={contact.headingNotFound}
            />
            <button
              className="absolute top-6 right-1 md:top-11 md:right-4 p-1"
              onClick={handleContactBtn}
            >
              <Close className="stroke-foreground w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
