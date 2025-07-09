'use client';
import { ButtonLayers } from '@/components/main/map/ButtonLayers';
import { ButtonLocation } from '@/components/main/map/ButtonLocation';
import { ButtonZoom } from '@/components/main/map/ButtonZoom';
import CustomLayerController from '@/components/main/map/CustomLayerController';
import { AnimatedDrawler } from '@/components/main/map/tasksPanel/AnimatedDrawler';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX } from 'react';
import { useMap } from 'react-leaflet';

export const CustomControlContent = (): JSX.Element => {
  const map = useMap();
  const layerDropIsOpen = useMapStore((state) => state.layerDropIsOpen);
  const toggleLayerDrop = useMapStore((state) => state.toggleLayerDrop);
  const handleZoomIn = (): void => {
    if (map) {
      map.zoomIn();
    }
  };

  const handleZoomOut = (): void => {
    if (map) {
      map.zoomOut();
    }
  };
  return (
    <div
      style={{
        height: '200px',
        width: '271px',
        position: 'relative',
        bottom: '10px',
        right: '10px',
        display: 'flex',
        backgroundColor: 'red',
      }}
    >
      <div className=" gap-1 hidden lg:flex z-[5001]">
        <ButtonZoom onClickHandler={handleZoomIn}>+</ButtonZoom>
        <ButtonZoom onClickHandler={handleZoomOut}>-</ButtonZoom>
      </div>
      {layerDropIsOpen && (
        <AnimatedDrawler
          isVisible={layerDropIsOpen}
          onClose={() => toggleLayerDrop()}
          className="z-[5002]"
        >
          <CustomLayerController className="z-[5001] absolute bottom-0 left-0" />
        </AnimatedDrawler>
      )}
      <div className="flex gap-2 z-[5001] absolute bottom-0 right-0">
        <ButtonLayers />
        <ButtonLocation />
      </div>
    </div>
  );
};
