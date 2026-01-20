import { useLocale } from 'next-intl';
import { redirect } from 'next/navigation';

export const useRedirectToLogin = (): void => {
  const locale = useLocale();
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  redirect(`${localePrefix}/login?next=${localePrefix}/account`);
};
