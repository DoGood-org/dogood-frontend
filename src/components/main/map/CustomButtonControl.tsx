import { useLeafletControl } from '@/hooks/useLeafletControl';
import { FormLocationComponent } from '@/components/main/map/FormLocationComponent';
import { createPortal } from 'react-dom';
import { ButtonLocation } from '@/components/main/map/ButtonLocation';


// CustomButtonControl component to render a button in the Leaflet map control
// This component uses the useLeafletControl hook to create a control in the Leaflet map
// and renders the ButtonLocation component inside it using createPortal.
// Default export due to the nature of Leaflet controls, which are not React components and need to be mounted directly to the DOM

type CustomButtonControlProps = {
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
};
const CustomButtonControl = ({ position }: CustomButtonControlProps) => {
  const container = useLeafletControl(position);

  if (!container) return null;

  return createPortal(<ButtonLocation />, container);
};

export default CustomButtonControl;
