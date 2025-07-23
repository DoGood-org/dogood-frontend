import { useLeafletControl } from '@/hooks/useLeafletControl';
import { JSX } from 'react';
import { createPortal } from 'react-dom';

type Position = 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

type SingleControlProps = {
  position: Position;
  children: React.ReactNode;
};

const SingleControl = ({
  position,
  children,
}: SingleControlProps): JSX.Element | null => {
  const container = useLeafletControl(position);
  if (!container) return null;
  return createPortal(children, container);
};

type MultiControlPanelProps = {
  controls: {
    position: Position;
    element: React.ReactNode;
  }[];
};

export const ProfileMultiControlPanel = ({
  controls,
}: MultiControlPanelProps): JSX.Element => {
  return (
    <>
      {controls.map(({ position, element }, index) => (
        <SingleControl key={index} position={position}>
          {element}
        </SingleControl>
      ))}
    </>
  );
};
