import { useLeafletControl } from '@/hooks/useLeafletControl';
import { FormLocationComponent } from '@/components/main/map/FormLocationComponent';
import { createPortal } from 'react-dom';



type FormLocationProps = {
  visible?: boolean;
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
};
const CustomFormControl = ({ visible, position }: FormLocationProps) => {
  const container = useLeafletControl(position);

  if (!container) return null;

  return createPortal(visible ? <FormLocationComponent /> : null, container);
};

export default CustomFormControl;
