'use client';

import React from 'react';
import { PageNavigation } from './PageNavigation';

export const BottomNavigation: React.FC = () => {
  return (
    <nav className="lg:hidden sticky bg-background flex justify-center items-center bottom-0 -ml-5 md:-ml-15 py-5 z-50 w-[393px] md:w-[768px] rounded-lg">
      <div className="bg-background w-[280px] px-5 py-4">
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
