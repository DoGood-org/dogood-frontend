import { useLeafletControl } from '@/hooks/useLeafletControl';
import { createPortal } from 'react-dom';
import { JSX } from 'react';
import { CustomControlContent } from '@/components/main/map/CustomControlContent';

// CustomControlPanel component to render a button in the Leaflet map control
// This component uses the useLeafletControl hook to create a control in the Leaflet map
// and renders the ButtonLocation component inside it using createPortal.
// Default export due to the nature of Leaflet controls, which are not React components and need to be mounted directly to the DOM

type CustomControlPanelProps = {
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
};
export const CustomControlPanel = ({
  position,
}: CustomControlPanelProps): JSX.Element | null => {
  const container = useLeafletControl(position);

  if (!container) return null;

  return createPortal(<CustomControlContent />, container);
};


