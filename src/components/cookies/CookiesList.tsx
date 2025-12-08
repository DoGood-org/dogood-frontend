'use client';

import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { CookieItem } from './CookieItem';
import { Accordion } from '@/components/ui/Accordion';
import { Category, CookiesListProps } from '@/types/cookiesType';

export const CookiesList = ({
  onOpenStateChange,
}: CookiesListProps): JSX.Element => {
  const handleChange = (values: string[]): void => {
    onOpenStateChange(values.length > 0);
  };
  const t = useTranslations('cookies');
  const categories = t.raw('categories') as Category[];

  return (
    <Accordion
      type="multiple"
      onValueChange={handleChange}
      className="mt-6 lg:mt-12"
    >
      {categories.map((category, id) => (
        <CookieItem key={id} cookieItem={category} />
      ))}
    </Accordion>
  );
};
