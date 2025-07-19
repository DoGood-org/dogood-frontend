import { ButtonMap } from '@/components';

import { FullscreenIcon } from 'lucide-react';
import { JSX } from 'react';

export const ButtonFullScreen = (): JSX.Element => {
  const handleClick = (): void => {
    console.log('ButtonFullScreen clicked');
  };

  return (
    <ButtonMap onClickHandler={handleClick}>
      <FullscreenIcon width={24} height={24} />
    </ButtonMap>
  );
};
