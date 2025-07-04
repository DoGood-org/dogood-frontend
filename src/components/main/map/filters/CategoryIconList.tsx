import { CategoryLabel } from '@/components/main/map/filters/CategoryLabel';
import React, { JSX } from 'react';

type Props = {
  categories: string[];
};
export const CategoryIconsList = ({
  categories,
}: Props): JSX.Element | null => {
  return (
    <ul className="flex gap-4">
      {categories.map((category: string, idx: React.Key | null | undefined) => (
        <CategoryLabel key={idx} category={category} />
      ))}
    </ul>
  );
};
