'use client';

import React from 'react';
import { PageNavigation } from './PageNavigation';

export const BottomNavigation: React.FC = () => {
  return (
    <nav className="lg:hidden sticky bottom-0 bg-background flex justify-center items-center py-5 z-50 rounded-lg px-5">
      <div className="bg-background max-w-[280px] w-full">
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
