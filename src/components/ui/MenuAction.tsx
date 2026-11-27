import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ElementType, JSX, ReactNode } from 'react';

type MenuActionProps = {
  icon: ElementType;
  label: string | ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  asChild?: boolean;
  iconClassName?: string;
};

export const MenuAction = ({
  icon: Icon,
  label,
  href,
  onClick,
  className = '',
  asChild = false,
  iconClassName = 'stroke-current size-5 shrink-0',
}: MenuActionProps): JSX.Element => {
  const defaultClassName =
    'flex items-center gap-3 text-white hover:text-btn-hover active:text-btn-active w-full text-left';

  const content = (
    <>
      <Icon className={iconClassName} />
      <span className="flex-1">{label}</span>
    </>
  );

  if (asChild) {
    return (
      <div onClick={onClick} className={cn(defaultClassName, className)}>
        {content}
      </div>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(defaultClassName, className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(defaultClassName, 'h-10 px-0', className)}
    >
      {content}
    </Button>
  );
};
