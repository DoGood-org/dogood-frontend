import Link from 'next/link';
import { ArrowRight } from '../icons';
import React from 'react';
import { cn } from '@/lib/utils';

interface LinkProps {
  href: string;
  text: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const LinkWithArrow = ({
  href,
  text,
  className = '',
  icon = <ArrowRight className="stroke-current size-6" />,
  onClick,
}: LinkProps): React.JSX.Element => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'text-base hover:text-btn-hover focus:text-btn-hover acvtive:text-btn-active flex items-center gap-2',
        className
      )}
    >
      <span>{text}</span> {icon}
    </Link>
  );
};
