import { ButtonMap } from '@/components';
import { useMapStore } from '@/zustand/stores/mapStore';

import { FullscreenIcon } from 'lucide-react';
import { JSX } from 'react';

export const ButtonFullScreen = (): JSX.Element => {
  const { fullscreenMap, toggleFullscreenMap } = useMapStore();

  const handleClick = (): void => {
    toggleFullscreenMap(!fullscreenMap);
  };

  return (
    <ButtonMap onClickHandler={handleClick}>
      <FullscreenIcon width={24} height={24} />
    </ButtonMap>
  );
};
