'use client';

import React from 'react';
import { NavigationLinks } from './NavigationLinks';

export const BottomNavigation: React.FC = () => {
  return (
    <nav className="lg:hidden flex justify-center items-center w-full fixed bottom-6 pt-[60px] pb-[60px] left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-[#0D0D0D] rounded-xl w-[280px]">
        <NavigationLinks
          showLabels={false}
          className="flex items-center justify-between gap-6"
          linkClassName="flex items-center p-0"
          iconClassName="w-6 h-6"
        />
      </div>
    </nav>
  );
};
