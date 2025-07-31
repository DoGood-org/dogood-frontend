import { hasLocale } from 'next-intl';
import { routing } from './routing';

type Messages = Record<string, Record<string, string>>;

export async function loadMessages(locale: string): Promise<Messages> {
  const namespaces = [
    'common',
    'header',
    'hero',
    'about',
    'map',
    'faq',
    'footer',
    'auth',
    'donate',
    'news',
    'howItWorks',
    'navigation',
    'account',
    'settings',
  ];

  const messages = Object.fromEntries(
    await Promise.all(
      namespaces.map(async (ns) => {
        const msgs = await import(`../../messages/${locale}/${ns}.json`);
        return [ns, msgs.default];
      })
    )
  );

  return messages;
}

import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});
