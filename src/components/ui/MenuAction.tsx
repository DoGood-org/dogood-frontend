import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ElementType, JSX } from 'react';

type MenuActionProps = {
  icon: ElementType;
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export const MenuAction = ({
  icon: Icon,
  label,
  href,
  onClick,
  className = '',
}: MenuActionProps): JSX.Element => {
  const defaultclassName =
    'flex gap-3 text-white hover:text-btn-hover active:text-btn-active';

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(defaultclassName, className)}
      >
        <Icon className="stroke-current size-5" />
        {label}
      </Link>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(defaultclassName, className, 'h-10 px-0')}
    >
      <Icon className="size-5" />
      {label}
    </Button>
  );
};
