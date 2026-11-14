'use client';

import { useEffect, useRef } from 'react';
import type {
  Icon,
  DivIcon,
  LatLngLiteral,
  Marker as LeafletMarker,
} from 'leaflet';
import type { Marker as RLMarker, Popup as RLPopup } from 'react-leaflet';

import baseLayerConfig from '@/components/main/map/config/baseLayerConfig';
import { useMapStore } from '@/zustand/stores/mapStore';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { ModalCloseButton } from '@/components/ui/ModalCloseButton';
import { MapSkeleton } from '@/components/main/map/MapSkeleton';

interface TaskMapModalProps {
  coords: LatLngLiteral;
  title: string;
  onClose: () => void;
}

interface OpenedMarkerProps {
  Marker: typeof RLMarker;
  Popup: typeof RLPopup;
  coords: LatLngLiteral;
  title: string;
  icon?: Icon | DivIcon;
}

const OpenedMarker = ({
  Marker,
  Popup,
  coords,
  title,
  icon,
}: OpenedMarkerProps): React.ReactElement => {
  const markerRef = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    markerRef.current?.openPopup();
  }, []);

  return (
    <Marker ref={markerRef} position={coords} icon={icon}>
      <Popup autoClose={false} closeOnClick={false} closeButton={false}>
        <strong>{title}</strong>
      </Popup>
    </Marker>
  );
};

export const TaskMapModal: React.FC<TaskMapModalProps> = ({
  coords,
  title,
  onClose,
}) => {
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
  const Popup = leafletComponents?.Popup;

  return (
    <ModalWrapper
      isOpen
      onClose={onClose}
      wrapperClassName="max-w-full md:max-w-[560px] lg:max-w-[900px] overflow-hidden"
      backdropClassName="bg-black/60 backdrop-blur-sm"
    >
      <ModalCloseButton
        onClick={onClose}
        className="top-3 right-3 z-[1100]"
        iconClassName="hover:text-[#999999]"
      />

      <div className="h-[65vh] min-h-[300px] w-full overflow-hidden rounded-xl">
        {!MapContainer || !TileLayer || !Marker || !Popup ? (
          <div className="flex h-full items-center justify-center">
            <MapSkeleton />
          </div>
        ) : (
          <MapContainer
            key={`${coords.lat}-${coords.lng}`}
            center={coords}
            zoom={15}
            minZoom={10}
            maxZoom={18}
            zoomControl
            attributionControl={false}
            scrollWheelZoom
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url={baseLayerConfig[activeLayer].url}
              maxZoom={18}
              minZoom={1}
            />

            <OpenedMarker
              Marker={Marker}
              Popup={Popup}
              coords={coords}
              title={title}
              icon={mapIcons.default ?? undefined}
            />
          </MapContainer>
        )}
      </div>
    </ModalWrapper>
  );
};
