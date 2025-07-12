import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

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
  ];

  const messages = Object.fromEntries(
    await Promise.all(
      namespaces.map(async (ns) => {
        const msgs = await import(`../../messages/${locale}/${ns}.json`);
        return [ns, msgs.default];
      })
    )
  );

  return {
    locale,
    messages,
  };
});
