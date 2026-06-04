import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ElementType, JSX } from 'react';

type MenuActionProps = {
  icon: ElementType;
  label: string;
  href?: string;
  onClick?: () => void;
};

export const MenuAction = ({
  icon: Icon,
  label,
  href,
  onClick,
}: MenuActionProps): JSX.Element => {
  const className =
    'flex gap-3 p-3 text-foreground hover:text-btn-hover active:text-btn-active';

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        <Icon className="size-5" />
        {label}
      </Link>
    );
  }

  return (
    <Button variant="ghost" onClick={onClick} className={className}>
      <Icon className="size-5" />
      {label}
    </Button>
  );
};
