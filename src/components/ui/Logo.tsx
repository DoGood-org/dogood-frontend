import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';
import logo from '@/assets/Logo.svg';
import { cn } from '@/lib/utils';

export const Logo = ({
  className = '',
}: {
  className?: string;
}): JSX.Element => {
  return (
    <Link href="/">
      <Image
        src={logo}
        alt="Logo DoGood"
        className={cn('w-[140px] h-auto', className)}
        priority
      />
    </Link>
  );
};
