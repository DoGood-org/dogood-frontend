'use client';
import { ButtonLayers } from '@/components/main/map/ButtonLayers';
import { ButtonLocation } from '@/components/main/map/ButtonLocation';
import { CustomControlZoom } from '@/components/main/map/CustomControlZoom';
import CustomLayerController from '@/components/main/map/CustomLayerController';
import { AnimatedDrawler } from '@/components/main/map/tasksPanel/AnimatedDrawler';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX } from 'react';

export const CustomControlContent = (): JSX.Element => {
  const layerDropIsOpen = useMapStore((state) => state.layerDropIsOpen);
  const toggleLayerDrop = useMapStore((state) => state.toggleLayerDrop);

  return (
    <>
      <div className="flex w-[300px] gap-6 justify-end">
        <CustomControlZoom />
        <div className="flex gap-6 bottom-0 left-0">
          <ButtonLayers />
          <ButtonLocation />
        </div>
      </div>

      {layerDropIsOpen && (
        <AnimatedDrawler
          isVisible={layerDropIsOpen}
          onClose={() => toggleLayerDrop()}
          className="absolute z-50 w-[160px] h-[168px] bottom-0 rounded-sm"
        >
          <CustomLayerController className=" absolute z-50" />
        </AnimatedDrawler>
      )}
    </>
  );
};
