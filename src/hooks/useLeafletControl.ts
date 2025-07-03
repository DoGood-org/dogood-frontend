import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

export function useLeafletControl(
  position: L.ControlPosition = 'topright'
): HTMLElement | null {
  const map = useMap();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = L.DomUtil.create('div', 'leaflet-control custom-react-control');
    el.style.pointerEvents = 'auto';
    L.DomEvent.disableClickPropagation(el);
    L.DomEvent.disableScrollPropagation(el);

    const control = new L.Control({ position });
    control.onAdd = (): HTMLElement => el;

    map.addControl(control);
    setContainer(el);

    return (): void => {
      map.removeControl(control);
    };
  }, [map, position]);

  return container;
}
