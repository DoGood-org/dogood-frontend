'use client';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

import type { ControlPosition } from 'leaflet';

export function useLeafletControl(
  position: ControlPosition = 'bottomright'
): HTMLElement | null {
  const map = useMap();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let L: typeof import('leaflet') | null = null;

    let control: import('leaflet').Control | null = null;

    const init = async (): Promise<void> => {
      if (typeof window === 'undefined') return;

      const leaflet = await import('leaflet');
      L = leaflet;

      const el = L.DomUtil.create(
        'div',
        'leaflet-control custom-react-control'
      );
      L.DomEvent.disableClickPropagation(el);
      L.DomEvent.disableScrollPropagation(el);

      control = new L.Control({ position });
      control.onAdd = (): HTMLElement => el;
      map.addControl(control);
      setContainer(el);
    };

    init();

    return (): void => {
      if (control && map) {
        map.removeControl(control);
      }
    };
  }, [map, position]);

  return container;
}
