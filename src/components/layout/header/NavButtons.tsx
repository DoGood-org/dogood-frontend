'use client';

import { Button } from '@/components/ui/Button';
import { NavButtonProps } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export const NavButtons: React.FC = () => {
  const t = useTranslations('header');
  const buttons = t.raw('buttons') as NavButtonProps[];
  const router = useRouter();
  const locale = useLocale();

  return (
    <>
      {buttons.map(({ name, src, variant }) => (
        <Button
          key={name}
          variant={variant}
          onClick={() => router.push(`/${locale}${src}`)}
          className=""
        >
          {name}
        </Button>
      ))}
    </>
  );
};
