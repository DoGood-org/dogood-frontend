import { IGrantsList } from '@/types/grantsType';
import React from 'react';

export const UniversalTypesList = ({
  items,
  className,
}: IGrantsList): React.JSX.Element => {
  return (
    <ul className={`flex flex-col gap-4 ${className || ''}`}>
      {items.map((item, index) => (
        <li
          key={index + item.title}
          className="flex flex-col w-full h-41.5 lg:h-53.5 items-center gap-3 lg:gap-4 p-5 lg:p-6 bg-btn-active rounded-md text-center"
        >
          {item.icon && (
            <item.icon className="w-12.5 h-12.5 md:w-10.5 md:h-10.5 lg:w-13.5 lg:h-13.5" />
          )}
          <h3 className="text-[20px] lg:text-h3 text-[#fffcfc]">
            {item.title}
          </h3>
          <span className="text-[12px] lg:text-base text-[#fffcfc]">
            {item.description}
          </span>
        </li>
      ))}
    </ul>
  );
};
