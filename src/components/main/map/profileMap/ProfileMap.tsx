'use client';
import baseLayerConfig from '@/components/main/map/config/baseLayerConfig';
import { CustomControlContent } from '@/components/main/map/CustomControlContent';
import { CustomControlZoom } from '@/components/main/map/CustomControlZoom';
import { MultiControlPanel } from '@/components/main/map/MultiControlPanel';
import { IMapClickHandlerProps } from '@/types/mapType';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX, useEffect } from 'react';
import { useMapEvent } from 'react-leaflet';

export const ProfileMap = (): JSX.Element => {
  const {
    initMap,
    leafletComponents,
    mapIcons,
    baseLayer,
    setClickedCoords,
    setShowOptionsMenu,
    // selectedTask,
    // customMarkers,
    // setCustomMarkers,
    // clickedCoords,
    // showOptionsMenu,
  } = useMapStore();

  useEffect(() => {
    initMap();
  }, []);

  if (
    !leafletComponents ||
    !mapIcons ||
    Object.values(mapIcons).some((icon) => !icon)
  ) {
    return <div>Loading map...</div>;
  }
  const { MapContainer, TileLayer, Marker, Popup } = leafletComponents;
  const MapClickHandler: React.FC<IMapClickHandlerProps> = ({
    onClick,
    allowClickToAddMarker,
    clickOptions,
    setClickedCoords,
    setShowOptionsMenu,
  }) => {
    useMapEvent('click', (e) => {
      const latlng = e.latlng;
      if (!allowClickToAddMarker) return;
      onClick(latlng);
      clickOptions?.setMe(latlng);
      clickOptions?.setMyMarker(latlng);
      setClickedCoords?.(latlng);
      setShowOptionsMenu?.(true);
    });

    return null;
  };
  return (
    <div>
      <MapContainer
        center={{ lat: 48.8566, lng: 2.3522 }} // Paris as default
        zoom={13}
        style={{ height: '400px', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        {baseLayerConfig[baseLayer] && (
          <TileLayer
            url={baseLayerConfig[baseLayer].url}
            attribution={baseLayerConfig[baseLayer].attribution}
          />
        )}
        <MultiControlPanel
          controls={[
            { position: 'bottomright', element: <CustomControlContent /> },
            { position: 'topright', element: <CustomControlZoom /> },
          ]}
        />
        <Marker
          position={{ lat: 48.8566, lng: 2.3522 }}
          icon={mapIcons.default!}
        >
          <Popup>Profile location</Popup>
        </Marker>

        <MapClickHandler
          onClick={() => {}}
          allowClickToAddMarker
          setClickedCoords={setClickedCoords}
          setShowOptionsMenu={setShowOptionsMenu}
        />
      </MapContainer>
    </div>
  );
};
