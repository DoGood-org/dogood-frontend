'use client';

import React from 'react';
import {
  Footer,
  Header,
  NotFoundComponent,
  Section,
  ThemeInitializer,
} from '@/components';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import ErrorDesk from '@/assets/images/notFound/errorDesck.png';
import ErrorTabl from '@/assets/images/notFound/errorTabl.png';
import ErrordMob from '@/assets/images/notFound/errorMob.png';
import enCommon from '../../messages/en/common.json';
import enHeader from '../../messages/en/header.json';
import enFooter from '../../messages/en/footer.json';
import uaCommon from '../../messages/ua/common.json';
import uaHeader from '../../messages/ua/header.json';
import uaFooter from '../../messages/ua/footer.json';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { AppLocale, Messages } from '@/types/errorType';

const allMessages: Record<AppLocale, Messages> = {
  en: {
    common: enCommon,
    header: enHeader,
    footer: enFooter,
  },
  ua: {
    common: uaCommon,
    header: uaHeader,
    footer: uaFooter,
  },
};

export default function GlobalError({
  reset,
}: {
  reset: () => void;
}): React.JSX.Element {
  const params = useParams();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1440px)');

  const heroImage = isMobile ? ErrordMob : isTablet ? ErrorTabl : ErrorDesk;

  const rawLocale = params?.locale as string | undefined;

  const locale: AppLocale =
    rawLocale && routing.locales.includes(rawLocale as AppLocale)
      ? (rawLocale as AppLocale)
      : routing.defaultLocale;

  const messages = allMessages[locale];

  const handleResetBtn = (): void => {
    try {
      if (typeof reset === 'function') {
        reset();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error resetting:', error);
      window.location.reload();
    }
  };
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeInitializer />
          <Header />
          <Section className="pt-[80px] lg:pt-[200px]">
            <NotFoundComponent
              scrImg={heroImage}
              title={messages.common.errorTitle}
              description={messages.common.errorDescr}
              text={messages.common.errorText}
              variantBtn1="primary"
              variantBtn2="secondary"
              hrefBtn2={`/${locale}/`}
              nameBtn1={messages.common.refreshBtn}
              nameBtn2={messages.common.backHomeBtn}
              stuckText={messages.common.stuckText}
              handleResetBtn={handleResetBtn}
            />
          </Section>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
