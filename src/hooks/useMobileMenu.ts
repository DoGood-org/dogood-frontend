'use client';

import { useEffect, useState } from 'react';

interface UseMobileMenuReturn {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const useMobileMenu = (): UseMobileMenuReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (): void => setIsOpen(!isOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return { isOpen, toggleMenu };
};
