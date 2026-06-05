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
    'flex gap-3 p-3 text-foreground hover:text-btn-hover active:text-btn-active';

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(defaultclassName, className)}
      >
        <Icon className="stroke-current" />
        {label}
      </Link>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(defaultclassName, className)}
    >
      <Icon className="size-5" />
      {label}
    </Button>
  );
};
