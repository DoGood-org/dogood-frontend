'use client';

import { JSX, useEffect } from 'react';
import { useMap } from 'react-leaflet';

export const MapAutoResize = (): JSX.Element | null => {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    const resizeObserver = new ResizeObserver((): void => {
      if (container.clientWidth > 0 && container.clientHeight > 0) {
        map.invalidateSize({
          pan: false,
          debounceMoveend: true,
        });
      }
    });
    resizeObserver.observe(container);

    return (): void => resizeObserver.disconnect();
  }, [map]);

  return null;
};
