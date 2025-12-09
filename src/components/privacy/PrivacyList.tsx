'use client';

import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { Accordion } from '@/components/ui/Accordion';
import { CookieItem } from '@/components/cookies/CookieItem';
import { Category, CookiesListProps } from '@/types/cookiesType';

export const PrivacyList = ({
  onOpenStateChange,
}: CookiesListProps): JSX.Element => {
  const handleChange = (values: string[]): void => {
    onOpenStateChange(values.length > 0);
  };
  const t = useTranslations('privacy');
  const categories = t.raw('categories') as Category[];

  return (
    <Accordion
      type="multiple"
      onValueChange={handleChange}
      className="mt-6 lg:mt-12"
    >
      {categories.map((category, id) => (
        <CookieItem key={id} cookieItem={category} withLine={false} />
      ))}
    </Accordion>
  );
};
