'use client';
import CustomLayerController from '@/components/main/map/controls/CustomLayerController';
import { ButtonFullScreen } from '@/components/main/map/profileMap/ButtonFullScreen';
import { ProfileButtonLocation } from '@/components/main/map/profileMap/ProfileButtonLocation';
import { ProfileCustomControlZoom } from '@/components/main/map/profileMap/ProfileCustomControlZoom';
import { AnimatedDrawler } from '@/components/ui/AnimatedDrawler';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX, useEffect, useRef } from 'react';
import L from 'leaflet';
import { ButtonLayers } from '../controls/ButtonLayers';

export const ProfileCustomControlContent = (): JSX.Element => {
  const layerDropIsOpen = useMapStore((state) => state.layerDropIsOpen);
  const toggleLayerDrop = useMapStore((state) => state.toggleLayerDrop);

  const controlsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (controlsRef.current) {
      L.DomEvent.disableClickPropagation(controlsRef.current);
      L.DomEvent.disableScrollPropagation(controlsRef.current);
    }
  }, []);

  return (
    <>
      <div
        ref={controlsRef}
        className="flex w-[300px] gap-5 justify-end items-end"
      >
        <ProfileCustomControlZoom />
        <div className="flex flex-col gap-2 bottom-0 left-0">
          <ButtonFullScreen />
          <ButtonLayers />
          <ProfileButtonLocation />
        </div>
      </div>

      {layerDropIsOpen && (
        <AnimatedDrawler
          isVisible={layerDropIsOpen}
          direction="horizontal"
          onClose={() => toggleLayerDrop()}
          className="absolute z-50 w-[160px] h-[168px] bottom-0 rounded-sm"
        >
          <CustomLayerController className=" absolute z-50" />
        </AnimatedDrawler>
      )}
    </>
  );
};
