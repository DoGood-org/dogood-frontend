'use client';
import { useMap, useMapEvent } from 'react-leaflet';
import { JSX, useEffect } from 'react';

export const Radius = (): JSX.Element | null => {
  const map = useMap();

  useEffect(() => {
    const center = map.getCenter();
    const bounds = map.getBounds();
    const north = bounds.getNorth();
    const radius = map.distance(center, { lat: north, lng: center.lng });

    console.info('[Radius] Initial radius:', radius, 'meters');
  }, [map]);

  useMapEvent('moveend', () => {
    const center = map.getCenter();
    const bounds = map.getBounds();
    const north = bounds.getNorth();
    const radius = map.distance(center, { lat: north, lng: center.lng });
    console.info('[Radius] Radius after move/zoom:', radius, 'meters');
  });

  return null;
};
