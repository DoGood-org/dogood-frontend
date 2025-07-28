import { useEffect, useState } from 'react';

// This hook provides the current viewport width and breakpoint states.
// It can be used to determine if the viewport is mobile, tablet, or desktop.

type TWindowSize = {
  width: number | null;
  height: number | null;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export function useWindowSize(): TWindowSize {
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateWidth = (): void => setWidth(window.innerWidth);
    const updateHeight = (): void => setHeight(window.innerHeight);
    updateWidth();
    updateHeight();
    window.addEventListener('resize', updateWidth);
    window.addEventListener('resize', updateHeight);
    return (): void => {
      window.removeEventListener('resize', updateWidth);
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return {
    width,
    height,
    isMobile: width !== null && width < 768,
    isTablet: width !== null && width >= 768 && width < 1440,
    isDesktop: width !== null && width >= 1440,
  };
}
