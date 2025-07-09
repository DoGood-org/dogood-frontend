import { useLeafletControl } from '@/hooks/useLeafletControl';
import { createPortal } from 'react-dom';
import { JSX, ReactNode } from 'react';

type Position = 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

type ControlItem = {
  position: Position;
  element: ReactNode;
};

type MultiControlPanelProps = {
  controls: ControlItem[];
};

export const MultiControlPanel = ({
  controls,
}: MultiControlPanelProps): JSX.Element | null => {
  return (
    <>
      {controls.map(({ position, element }, index) => {
        const container = useLeafletControl(position);
        if (!container) return null;
        return createPortal(
          <>{element}</>,
          container,
          `leaflet-control-${index}`
        );
      })}
    </>
  );
};
