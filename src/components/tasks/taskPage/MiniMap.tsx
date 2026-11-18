'use client';

import { useEffect } from 'react';
import type { LatLngLiteral } from 'leaflet';

import baseLayerConfig from '@/components/main/map/config/baseLayerConfig';
import { useMapStore } from '@/zustand/stores/mapStore';

interface MiniMapProps {
  coords: LatLngLiteral;
  zoom?: number;
}

export const MiniMap: React.FC<MiniMapProps> = ({ coords, zoom = 10 }) => {
  const initMap = useMapStore((s) => s.initMap);
  const leafletComponents = useMapStore((s) => s.leafletComponents);
  const mapIcons = useMapStore((s) => s.mapIcons);
  const activeLayer = useMapStore((s) => s.activeLayer);

  useEffect(() => {
    void initMap('main');
  }, [initMap]);

  const MapContainer = leafletComponents?.MapContainer;
  const TileLayer = leafletComponents?.TileLayer;
  const Marker = leafletComponents?.Marker;

  if (!MapContainer || !TileLayer || !Marker) {
    return <div className="h-[80px] w-[80px] shrink-0 rounded bg-gray" />;
  }

  return (
    <div className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded">
      <div className="absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 scale-50">
        <MapContainer
          key={`${coords.lat}-${coords.lng}`}
          center={coords}
          zoom={zoom}
          minZoom={8}
          maxZoom={18}
          zoomControl={false}
          scrollWheelZoom={false}
          attributionControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url={baseLayerConfig[activeLayer].url} maxZoom={18} />
          <Marker position={coords} icon={mapIcons.default ?? undefined} />
        </MapContainer>
      </div>
    </div>
  );
};
