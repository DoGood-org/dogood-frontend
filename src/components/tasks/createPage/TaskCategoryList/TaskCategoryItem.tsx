'use client';

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
    <div className="flex gap2">
      {withWhiteCircle ? (
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full ${colorClass ?? 'bg-white'}`}
        >
          <Icon className="w-5 h-5 text-white stroke-white fill-none" />
        </div>
      ) : (
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full ${colorClass ?? 'bg-white'}`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};
