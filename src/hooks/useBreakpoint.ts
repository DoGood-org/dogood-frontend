import { useEffect, useState } from 'react';

// This hook provides the current viewport width and breakpoint states.
// It can be used to determine if the viewport is mobile, tablet, or desktop.

export function useBreakpoint(): {
  width: number | null;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
} {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateWidth = (): void => setWidth(window.innerWidth);
    updateWidth(); // initial
    window.addEventListener('resize', updateWidth);
    return (): void => window.removeEventListener('resize', updateWidth);
  }, []);

  return {
    width,
    isMobile: width !== null && width < 768,
    isTablet: width !== null && width >= 768 && width < 1440,
    isDesktop: width !== null && width >= 1440,
  };
}
