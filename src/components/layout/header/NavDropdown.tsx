'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavDropdownProps } from '@/types';
import { CaretDown } from '@/components/icons';
import { Button } from '@/components';
import { useMediaQuery } from '@/hooks';

export const NavDropdown = ({
  trigger,
  children,
  className,
  isIcon = false,
  isOpen = false,
  setIsOpen,
}: NavDropdownProps): React.JSX.Element => {
  const containerRef = useRef<HTMLLIElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useMediaQuery('(min-width: 1440px)');

  // Закриття по кліку поза дропдауном
  useEffect((): (() => void) | void => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  return (
    <li ref={containerRef} className="relative h-[72px] flex items-center">
      {isIcon && isDesktop ? (
        <button
          className="flex items-center cursor-pointer gap-1 lg:hover:border-btn-outline-hover"
          onClick={() => setIsOpen(!isOpen)}
        >
          {trigger}
          <CaretDown
            className={`stroke-current transition-transform duration-700 size-3
            ${isOpen ? 'rotate-180' : ''}
            `}
          />
        </button>
      ) : (
        <Button
          variant="ghost"
          size="md"
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 focus:outline-none flex items-baseline items-center cursor-pointer hover:border-transparent lg:hover:border-btn-outline-hover ${isOpen && 'border-btn-outline-active'}`}
        >
          {trigger}
          <CaretDown
            className={`stroke-current transition-transform duration-700 size-6
            ${isOpen ? 'rotate-180' : ''}
            `}
          />
        </Button>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className={`absolute top-full right-0 z-20  bg-header-bg  px-6 py-5 shadow-xl gap-4 ${className}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
