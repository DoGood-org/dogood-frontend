'use client';

import React from 'react';
import { NavigationLinks } from './NavigationLinks';

export const BottomNavigation: React.FC = () => {
  return (
    <nav className="lg:hidden flex justify-center w-full fixed bottom-6 pt-[60px] pb-[60px] px-[56px] left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black rounded-xl">
        <NavigationLinks
          showLabels={false}
          className="flex justify-center items-center gap-6"
          linkClassName="flex flex-col items-center text-[#f1f1f1]"
          iconClassName="w-6 h-6 transition duration-300"
        />
      </div>
    </nav>
  );
};
