import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';
import logo from '@/assets/logo_black.svg';
import logoWhite from '@/assets/Logo.svg';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

export const BlockedLogo = ({
  className = '',
  variant,
}: {
  className?: string;
  variant?: 'light' | 'dark';
}): JSX.Element => {
  const { theme } = useTheme();

  const getLogoSrc = (): string | StaticImageData => {
    if (variant) {
      return variant === 'light' ? logoWhite : logo;
    }
    return theme === 'dark' ? logoWhite : logo;
  };

  return (
    <Link href="/">
      <Image
        src={getLogoSrc()}
        alt="Logo DoGood"
        className={cn('w-[140px] h-auto', className)}
        priority
      />
    </Link>
  );
};
