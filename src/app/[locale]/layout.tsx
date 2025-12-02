import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import React from 'react';
import { routing } from '@/i18n/routing';
import './globals.css';
import { meta } from '@/data/metadata';
import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import ToastProvider from '@/components/ToastProvider';
import { ThemeInitializer } from '@/components/layout/theme/ThemeInitializer';
import { MainLayoutContent } from '@/components/layout/mainLayout/MainLayout';
import { Header } from '@/components/layout/header/Header';
import { Footer } from '@/components/layout/footer/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = meta;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>): Promise<React.JSX.Element> {
  const { locale } = await params;
  const me = await getServerCurrentUser();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} antialiased flex flex-col justify-between min-h-[100vh]`}
      >
        <MainLayoutContent user={me}>
          <ThemeInitializer />
          <NextIntlClientProvider locale={locale}>
            <Header />
            <main className="pt-[80px] lg:pt-[72px]">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </MainLayoutContent>
        <ToastProvider />
      </body>
    </html>
  );
}
