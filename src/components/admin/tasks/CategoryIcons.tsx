import { JSX } from 'react';
import { cn } from '@/lib/utils';
import { getCategoryConfig } from '@/utils/getCategoryConfig';

interface CategoryIconsProps {
  categories?: readonly (string | null | undefined)[] | null;
  sizeClassName?: string;
  iconClassName?: string;
  className?: string;
}

export const CategoryIcons = ({
  categories,
  sizeClassName = 'w-6 h-6',
  iconClassName = 'w-4 h-4',
  className,
}: CategoryIconsProps): JSX.Element | null => {
  if (!categories || categories.length === 0) return null;

  const items = categories
    .map((c) => getCategoryConfig(c))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  if (items.length === 0) return null;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {items.map(({ id, icon: Icon, colorClass, label }) => (
        <span
          key={id}
          title={label}
          aria-label={label}
          className={cn(
            'flex items-center justify-center rounded-full text-white',
            sizeClassName,
            colorClass
          )}
        >
          <Icon className={iconClassName} />
        </span>
      ))}
    </div>
  );
};
