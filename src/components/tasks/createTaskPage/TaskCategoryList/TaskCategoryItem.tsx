'use client';

import { cn } from '@/lib/utils';
import { JSX, ReactElement, SVGProps } from 'react';

interface CategoryItemProps {
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  colorClass?: string;
  withWhiteCircle?: boolean;
}

export const TaskCategoryItem = ({
  icon: Icon,
  colorClass,
  withWhiteCircle,
}: CategoryItemProps): JSX.Element | null => {
  if (!Icon) return null;

  return (
    <div className="flex gap-2">
      <div
        className={cn(
          'flex items-center justify-center w-12 h-12 rounded-full',
          withWhiteCircle ? 'bg-white border border-black' : colorClass
        )}
      >
        <Icon
          className={cn(
            'w-5 h-5',
            withWhiteCircle ? 'text-black' : 'text-white'
          )}
        />
      </div>
    </div>
  );
};
