import { useState, useEffect } from 'react';

export function useDeviceType(): 'sm' | 'md' | 'lg' {
  const [device, setDevice] = useState<'sm' | 'md' | 'lg'>(() => {
    const width = window.innerWidth;
    if (width >= 1440) return 'lg';
    if (width >= 768) return 'md';
    return 'sm';
  });

  useEffect(() => {
    function updateDevice(): void {
      const width = window.innerWidth;
      if (width >= 1440) {
        setDevice('lg');
      } else if (width >= 768) {
        setDevice('md');
      } else {
        setDevice('sm');
      }
    }

    updateDevice();
    window.addEventListener('resize', updateDevice);

    return (): void => {
      window.removeEventListener('resize', updateDevice);
    };
  }, []);

  return device;
}
