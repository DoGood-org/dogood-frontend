import Link from 'next/link';
import { ArrowRight } from '../icons';
import React from 'react';

interface LinkProps {
  href: string;
  text: string;
}

export const LinkWithArrow = ({ href, text }: LinkProps): React.JSX.Element => {
  return (
    <Link
      href={href}
      className="text-p2-d/[24px] hover:text-btn-hover focus:text-btn-hover acvtive:text-btn-active flex items-center gap-2"
    >
      {text} <ArrowRight className="stroke-current size-6" />
    </Link>
  );
};
