import Link from 'next/link';
import { ArrowRight } from '../icons';
import React from 'react';
import { cn } from '@/lib/utils';

interface LinkProps {
  href: string;
  text: string;
  className?: string;
}

export const LinkWithArrow = ({
  href,
  text,
  className = '',
}: LinkProps): React.JSX.Element => {
  return (
    <Link
      href={href}
      className={cn(
        'text-p2-d/[24px] hover:text-btn-hover focus:text-btn-hover acvtive:text-btn-active flex items-center gap-2 cursor-pointer',
        className
      )}
    >
      {text} <ArrowRight className="stroke-current size-6" />
    </Link>
  );
};
