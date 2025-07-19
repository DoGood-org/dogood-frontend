'use client';

import React from 'react';
import { PageNavigation } from './PageNavigation';

export const SidebarNavigation: React.FC = () => {
  return (
    <aside className="lg:block lg:min-w-[136px] bg-background pt-20">
      <nav className="hidden lg:flex flex-col gap-6">
        <PageNavigation
          showLabels={true}
          className="flex flex-col gap-6 "
          navLabels="text-base text-foreground"
          linkClassName="flex gap-5 p-3"
          iconClassName="w-6 h-6"
        />
      </nav>
    </aside>
  );
};
