'use client';

import { useMediaQuery } from './useMediaQuery';

type ImageMap<T> = {
  mobile: T;
  tablet: T;
  desktop: T;
};

interface ResponsiveImageReturn<T> {
  image: T;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
}

export const useResponsiveImage = <T>(
  images: ImageMap<T>
): ResponsiveImageReturn<T> => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1439px)');
  const isDesktop = useMediaQuery('(min-width: 1440px)');

  let image: T;
  let screenSize: 'mobile' | 'tablet' | 'desktop';

  if (isMobile) {
    image = images.mobile;
    screenSize = 'mobile';
  } else if (isTablet) {
    image = images.tablet;
    screenSize = 'tablet';
  } else {
    image = images.desktop;
    screenSize = 'desktop';
  }

  return {
    image,
    isMobile,
    isTablet,
    isDesktop,
    screenSize,
  };
};
