'use client';
import { useMap, useMapEvent } from 'react-leaflet';
import { JSX, useEffect } from 'react';

export const Radius = (): JSX.Element | null => {
  const map = useMap();

  useEffect(() => {
    console.log('[RadiusDebug] useMap() fired:', !!map);
    const center = map.getCenter();
    const bounds = map.getBounds();
    const north = bounds.getNorth();
    const radius = map.distance(center, { lat: north, lng: center.lng });
    console.log('[RadiusDebug] Visible radius:', radius, 'meters');
  }, [map]);

  useMapEvent('moveend', () => {
    const center = map.getCenter();
    const bounds = map.getBounds();
    const north = bounds.getNorth();
    const radius = map.distance(center, { lat: north, lng: center.lng });
    console.log('[RadiusDebug] Radius after move/zoom:', radius, 'meters');
  });

  return null;
};
