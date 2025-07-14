'use client';
import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';

type Props = {
  delay?: number;
};

export const ScrollAfterDelay: React.FC<Props> = ({ delay = 2000 }) => {
  const map = useMap();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollEnabledRef = useRef(false);

  useEffect(() => {
    const container = map.getContainer();
    if (!container) return;

    const handleMouseEnter = () => {
      if (scrollEnabledRef.current) return;

      timeoutRef.current = setTimeout(() => {
        map.scrollWheelZoom.enable();
        container.style.cursor = 'grab';
        scrollEnabledRef.current = true;
      }, delay);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (scrollEnabledRef.current) {
        map.scrollWheelZoom.disable();
        container.style.cursor = 'default';
        scrollEnabledRef.current = false;
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay, map]);

  return null;
};
