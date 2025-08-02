'use client';

import { useState } from 'react';

interface UseMenuToggleReturn {
  isOpen: boolean;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}

export const useMenuToggle = (): UseMenuToggleReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => setIsOpen((prev: boolean) => !prev);
  const openMenu = (): void => setIsOpen(true);
  const closeMenu = (): void => setIsOpen(false);

  return { isOpen, toggleMenu, openMenu, closeMenu };
};
