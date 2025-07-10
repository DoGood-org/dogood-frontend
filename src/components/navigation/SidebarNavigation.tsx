'use client';

import React from 'react';
import { NavigationLinks } from './NavigationLinks';

export const SidebarNavigation: React.FC = () => {
  return (
    <nav className="hidden lg:flex flex-col pt-40">
      <NavigationLinks
        showLabels={true}
        linkClassName="py-2 px-4 rounded hover:bg-blue-100"
        iconClassName="w-6 h-6 fill-gray-500 group-hover:fill-blue-600 transition"
      />
    </nav>
  );
};
