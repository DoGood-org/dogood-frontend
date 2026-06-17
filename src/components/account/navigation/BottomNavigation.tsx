'use client';

import React from 'react';
import { PageNavigation } from './PageNavigation';
import { SidebarNavigationProps } from '@/types';
import { cn } from '@/lib/utils';

export const BottomNavigation: React.FC<SidebarNavigationProps> = ({
  items,
  translation,
  navClassName = '',
  menuWrapperClassName = '',
}) => {
  return (
    <nav
      className={cn(
        'sticky bottom-0 z-50 flex items-center justify-center px-5 py-5 rounded-lg lg:hidden bg-background',
        navClassName
      )}
    >
      <div
        className={cn(
          'bg-background max-w-[280px] w-full',
          menuWrapperClassName
        )}
      >
        <PageNavigation
          items={items}
          t={translation}
          showLabels={false}
          className="flex items-center justify-between gap-6"
          linkClassName="flex items-center p-0"
          iconClassName="w-6 h-6"
        />
      </div>
    </nav>
  );
};
