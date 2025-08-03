import { ButtonMap } from '@/components';
import FullScreenIcon from '@/components/icons/FullscreenIcon';
import { useMapStore } from '@/zustand/stores/mapStore';

import { JSX } from 'react';

export const ButtonFullScreen = (): JSX.Element => {
  const { fullscreenMap, toggleFullscreenMap } = useMapStore();

  const handleClick = (): void => {
    toggleFullscreenMap(!fullscreenMap);
  };

  return (
    <ButtonMap onClickHandler={handleClick}>
      <FullScreenIcon className="w-6 h-6 stroke-foreground text-foreground" />
    </ButtonMap>
  );
};
