'use client';

import React from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface AdminTabsProps {
  className?: string;
}

const ADMIN_TABS = [
  { label: 'users', translationKey: 'users', path: '/admin/users' },
  { label: 'tasks', translationKey: 'tasks', path: '/admin/tasks' },
] as const;

export const AdminTabs: React.FC<AdminTabsProps> = ({ className }) => {
  const pathname = usePathname();
  const t = useTranslations('adminNav');

  return (
    <nav
      className={cn('flex items-center gap-2 mb-2 md:mb-6 md:gap-4', className)}
      role="tablist"
      aria-label="Admin sections"
    >
      {ADMIN_TABS.map(({ label, translationKey, path }) => {
        const isActive = pathname === path || pathname.startsWith(`${path}/`);

        return (
          <Link
            key={label}
            href={path}
            role="tab"
            aria-selected={isActive}
            className={cn(
              'flex items-center justify-center gap-3 w-full p-3',
              'bg-card rounded-md border border-transparent transition duration-300 text-bg-icon cursor-pointer',
              isActive ? 'border-border' : 'border-transparent'
            )}
          >
            {t(translationKey)}
          </Link>
        );
      })}
    </nav>
  );
};
