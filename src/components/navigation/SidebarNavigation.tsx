'use client';

import React from 'react';
import { NavigationLinks } from './NavigationLinks';

export const SidebarNavigation: React.FC = () => {
  return (
    <aside className="pt-20">
      <nav className="sm:hidden lg:flex flex-col">
        <NavigationLinks
          showLabels={true}
          navLabels="text-[#0D0D0D] text-[16px] font-normal leading-6 tracking-normal group-hover:text-[#1B9757] transition-colors duration-300"
          linkClassName="flex gap-5 p-3"
          iconClassName="w-6 h-6 stroke-gray-500"
        />
      </nav>
    </aside>
  );
};
