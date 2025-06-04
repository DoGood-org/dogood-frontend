'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from '@/components/icons';
import { NavDropdownProps } from '@/types';

export const NavDropdown = ({
  trigger,
  children,
  className,
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
    <li ref={containerRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="focus:outline-none flex items-baseline gap-[10px] h-[104px] items-center cursor-pointer"
      >
        {trigger}
        <ChevronDown
          className={`w-[14px] h-[8px] fill-border transition-transform duration-700
            ${open ? 'rotate-180' : ''}
            `}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: -100, maxHeight: '200px' }}
            animate={{ opacity: 1, y: 0, maxHeight: '400px' }}
            exit={{ opacity: 0, y: -10, maxHeight: '200px' }}
            transition={{ duration: 0.7 }}
            className={`absolute top-full left-0 z-20 rounded-b-[10px] bg-layout-background p-4 shadow-xl gap-4 ${className}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
