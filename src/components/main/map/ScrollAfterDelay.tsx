import { useMap } from 'react-leaflet';
import { JSX, useEffect, useRef } from 'react';

type Props = {
  delay?: number;
};
export const ScrollAfterDelay: React.FC<Props> = ({
  delay = 2000,
}): JSX.Element | null => {
  const map = useMap();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect((): (() => void) => {
    const container: HTMLElement = map.getContainer();

    const handleMouseEnter = (): void => {
      timeoutRef.current = setTimeout(() => {
        map.scrollWheelZoom.enable();
        container.style.cursor = 'grab';

        const suppressScroll = (e: WheelEvent): void => {
          e.preventDefault();
        };

        window.addEventListener('wheel', suppressScroll, { passive: false });

        setTimeout(() => {
          window.removeEventListener('wheel', suppressScroll);
        }, 200);
      }, delay);
    };

    const handleMouseLeave = (): void => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      map.scrollWheelZoom.disable();
      container.style.cursor = '';
    };

    const handleMouseDown = (): void => {
      container.style.cursor = 'grabbing';
    };

    const handleMouseUp = (): void => {
      container.style.cursor = 'grab';
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
    };
  }, [map, delay]);

  return null;
};
