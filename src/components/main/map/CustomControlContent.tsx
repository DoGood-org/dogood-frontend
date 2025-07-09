'use client';
import { ButtonLayers } from '@/components/main/map/ButtonLayers';
import { ButtonLocation } from '@/components/main/map/ButtonLocation';
import CustomLayerController from '@/components/main/map/CustomLayerController';
import { AnimatedDrawler } from '@/components/main/map/tasksPanel/AnimatedDrawler';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX } from 'react';

export const CustomControlContent = (): JSX.Element => {
  const layerDropIsOpen = useMapStore((state) => state.layerDropIsOpen);
  const toggleLayerDrop = useMapStore((state) => state.toggleLayerDrop);

  return (
    <div
      style={{
        width: '271px',
        position: 'relative',

        display: 'flex',
      }}
    >
      {layerDropIsOpen && (
        <AnimatedDrawler
          isVisible={layerDropIsOpen}
          onClose={() => toggleLayerDrop()}
          className="w-[160px] h-[168px]  rounded-sm"
        >
          <CustomLayerController className=" absolute bottom-0 left-0" />
        </AnimatedDrawler>
      )}
      <div className="flex gap-2 absolute bottom-0 right-0">
        <ButtonLayers />
        <ButtonLocation />
      </div>
    </div>
  );
};
