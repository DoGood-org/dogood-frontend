'use client';

import React from 'react';
import { PageNavigation } from './PageNavigation';

export const BottomNavigation: React.FC = () => {
  return (
    <nav className="lg:hidden flex justify-center items-center w-full sticky bottom-0 pt-[60px] md:pt-[38px] pb-[60px] md:pb-[64px] left-0 z-50">
      <div className="bg-background rounded-xl w-[280px]">
        <PageNavigation
          showLabels={false}
          className="flex items-center justify-between gap-6"
          linkClassName="flex items-center p-0"
          iconClassName="w-6 h-6"
        />
      </div>
    </nav>
  );
};
