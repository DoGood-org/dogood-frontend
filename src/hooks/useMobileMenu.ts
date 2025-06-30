'use client';

import { useMediaQuery } from '@/hooks';
import { useEffect, useState } from 'react';

interface UseMobileMenuReturn {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const useMobileMenu = (): UseMobileMenuReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const toggleMenu = (): void => setIsOpen(!isOpen);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    return (): void => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  return { isOpen, toggleMenu };
};
