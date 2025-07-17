'use client';

import { NavItemRenderer } from '@/components';
import { Burger, CloseMenu } from '@/components/icons';
import Portal from '@/components/ui/portal/Portal';
import { useMobileMenu, useSortedMobileNav } from '@/hooks';
import { NavItem } from '@/types';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export const MobileMenu = (): React.JSX.Element => {
  const { isOpen, toggleMenu } = useMobileMenu();
  const [openItem, setOpenItem] = useState<string>('');
  const t = useTranslations('header');
  const nav = t.raw('nav') as NavItem[];
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) setOpenItem('');
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        toggleMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleMenu]);

  const mobileNav = useSortedMobileNav(nav);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="relative z-50 p-2 text-white cursor-pointer"
      >
        {isOpen ? (
          <CloseMenu className="size-6" />
        ) : (
          <Burger className="size-6" />
        )}
      </button>
      <Portal>
        <div
          className={`fixed inset-0 md:inset-y-auto w-full mx-auto md:max-w-[768px]  md:flex md:px-15 md:justify-end md:top-[80px] top-[80px] z-[9000] transition-transform duration-500 ease-in-out transform ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }
            `}
        >
          <div
            ref={menuRef}
            className="md:w-[393px] min-h-[350px] h-full md:h-auto bg-layout-background text-white md:-mr-15"
          >
            <ul className="flex flex-col gap-2 max-w-[393px] px-[62px] py-10 mx-auto">
              {mobileNav.map((item, idx) => (
                <NavItemRenderer
                  key={idx}
                  navItem={item}
                  variant="mobile"
                  openItem={openItem}
                  setOpenItem={setOpenItem}
                  toggleMenu={toggleMenu}
                />
              ))}
            </ul>
          </div>
        </div>
      </Portal>
    </>
  );
};
