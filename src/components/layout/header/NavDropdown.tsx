'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CaretDown } from '@/components/icons';
import { NavDropdownProps } from '@/types';
import { Button } from '@/components/ui/Button';

export const NavDropdown = ({
  trigger,
  children,
  className,
  isIcon = false,
}: NavDropdownProps): React.JSX.Element => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Закриття по кліку поза дропдауном
  useEffect((): (() => void) | void => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <li ref={containerRef} className="relative h-[72px] flex items-center">
      {!isIcon ? (
        <Button
          variant="ghost"
          size="md"
          onClick={() => setOpen((prev) => !prev)}
          className="p-4 focus:outline-none flex items-baseline items-center cursor-pointer"
        >
          {trigger}
          <CaretDown
            className={`stroke-current transition-transform duration-700 size-6
            ${open ? 'rotate-180' : ''}
            `}
          />
        </Button>
      ) : (
        <button
          className="flex items-center cursor-pointer gap-1"
          onClick={() => setOpen((prev) => !prev)}
        >
          {trigger}
          <CaretDown
            className={`stroke-current transition-transform duration-700 size-3
            ${open ? 'rotate-180' : ''}
            `}
          />
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className={`absolute top-full right-0 z-20 rounded-b-[10px] bg-header-bg  px-6 py-5 shadow-xl gap-4 ${className}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
