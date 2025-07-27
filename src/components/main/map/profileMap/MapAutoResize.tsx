'use client';

import { JSX, useEffect } from 'react';
import { useMap } from 'react-leaflet';

export const MapAutoResize = (): JSX.Element | null => {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    const resizeObserver = new ResizeObserver((): void => {
      map.invalidateSize();
    });
    resizeObserver.observe(container);

    return (): void => resizeObserver.disconnect();
  }, []);

  return null;
};
