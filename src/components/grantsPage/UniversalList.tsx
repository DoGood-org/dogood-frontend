import { IGrantsItem } from '@/types/grantsType';
import React from 'react';

interface UniversalListProps {
  title: string;
  items: IGrantsItem[];
}
export const UniversalList = ({
  items,
  title,
}: UniversalListProps): React.JSX.Element => {
  return (
    <div className="bg-background-grants border border-[#00BBA733] p-4 rounded-lg md:p-6 lg:w-129">
      <h3 className="text-base text-btn-hover text-start mb-3">{title}</h3>
      <ul className="w-full flex flex-wrap justify-start gap-2">
        {items.map((item, index) => (
          <li
            key={index + item.title}
            className="flex items-center gap-2 bg-grant-card border border-text-gray dark:border-transparent p-3 lg:py-2 rounded-sm"
          >
            {item.icon && <item.icon className="w-4 h-4 lg:w-6 lg:h-6" />}
            <span className="text-[12px] lg:text-base">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
