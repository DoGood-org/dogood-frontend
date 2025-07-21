'use client';

import { JSX, useEffect } from 'react';
import { useMap } from 'react-leaflet';

export const MapAutoResize = (): JSX.Element | null => {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return null;
};
