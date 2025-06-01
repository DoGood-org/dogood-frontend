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
          size="xs"
          onClick={() => router.push(`/${locale}${src}`)}
          className="hover:border-btn-hover"
        >
          <span className="absolute inset-0 bg-btn-hover origin-center rounded-sm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-800 z-0"></span>
          <span className="relative z-10 flex gap-[18px] md:gap-[10px] xl:gap-3">
            {name}
          </span>
        </Button>
      ))}
    </>
  );
};
