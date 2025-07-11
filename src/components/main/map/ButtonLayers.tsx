import { ButtonMap } from '@/components';

import { useMapStore } from '@/zustand/stores/mapStore';
import { Layers } from 'lucide-react';
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
