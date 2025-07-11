'use client';

import React from 'react';
import { NavigationLinks } from './NavigationLinks';

export const SidebarNavigation: React.FC = () => {
  return (
    <aside className="lg:w-[136px] pt-20">
      <nav className="hidden lg:flex flex-col gap-6">
        <NavigationLinks
          showLabels={true}
          className="flex flex-col gap-6 "
          navLabels="text-[#0D0D0D] text-base"
          linkClassName="flex gap-5 p-3"
          iconClassName="w-6 h-6"
        />
      </nav>
    </aside>
  );
};
