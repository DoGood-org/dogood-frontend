'use client';

import { useTranslations } from 'next-intl';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { More, Settings } from '@/components/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Role } from '@/lib/getUserRole';

export const Report = ({ role }: { role: Role }): JSX.Element => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('organization');
  const pathname = usePathname();

  const handleClickOutside = useCallback(
    (e: MouseEvent): void => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleToggleMenu = (e: React.MouseEvent<SVGSVGElement>): void => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const adminVersion = (
    <Link href={`${pathname}/settings`} className="flex gap-3">
      <Settings className="size-5 stroke-current" />
      {t('settings')}
    </Link>
  );

  const itemStyles = 'p-3 text-nowrap';

  const reportVersions = {
    ADMIN: adminVersion,
    MODERATOR: adminVersion,
    MEMBER: (
      <ul>
        <li className={itemStyles}>{t('dotMenu.report')}</li>
        <li className={itemStyles}>{t('dotMenu.copyLink')}</li>
        <li className={itemStyles}>{t('leaveOrg')}</li>
      </ul>
    ),
    USER: (
      <ul>
        <li className={itemStyles}>{t('dotMenu.report')}</li>
        <li className={itemStyles}>{t('dotMenu.copyLink')}</li>
      </ul>
    ),
  };

  return (
    <div ref={buttonRef} className="relative">
      <More
        className="absolute top-0 right-2 w-5 h-5 text-foreground cursor-pointer 
              hover:text-btn-hover active:text-btn-active"
        onClick={handleToggleMenu}
      />
      {isOpen && (
        <div className="absolute top-[25px] right-2 rounded-lg bg-review-bg p-4">
          {reportVersions[role]}
        </div>
      )}
    </div>
  );
};
