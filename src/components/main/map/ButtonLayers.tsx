import { ButtonMap } from '@/components';
import { Layers } from '@/components/icons/Layers';

import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX } from 'react';

export const ButtonLayers = (): JSX.Element => {
  const toggleLayerDrop = useMapStore((state) => state.toggleLayerDrop);
  const handleClick = (): void => {
    toggleLayerDrop();
  };

  return (
    <ButtonMap onClickHandler={handleClick}>
      <Layers className=" w-6 h-6" />
    </ButtonMap>
  );
};
