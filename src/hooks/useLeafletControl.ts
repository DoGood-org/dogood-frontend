'use client';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

import type { ControlPosition } from 'leaflet';

export function useLeafletControl(position: ControlPosition = 'bottomright') {
  const map = useMap();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let L: typeof import('leaflet') | null = null;

    const init = async () => {
      if (typeof window === 'undefined') return;

      const leaflet = await import('leaflet');
      L = leaflet;

      const el = L.DomUtil.create(
        'div',
        'leaflet-control custom-react-control'
      );
      L.DomEvent.disableClickPropagation(el);
      L.DomEvent.disableScrollPropagation(el);

      const control = new L.Control({ position });
      control.onAdd = () => el;
      map.addControl(control);
      setContainer(el);

      return () => {
        map.removeControl(control);
      };
    };

    init();
  }, [map, position]);

  return container;
}
