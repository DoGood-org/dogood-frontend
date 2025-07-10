'use client';

import React from 'react';
import { NavigationLinks } from './NavigationLinks';

export const BottomNavigation: React.FC = () => {
  return (
    <nav className="flex lg:hidden justify-around w-full p-2">
      <NavigationLinks
        showLabels={false}
        linkClassName="flex flex-col items-center gap-1"
        iconClassName="w-[24px] h-[24px] fill-gray-500 group-hover:fill-blue-600 transition duration-300"
      />
    </nav>
  );
};
