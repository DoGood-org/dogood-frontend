// hooks/useDebounce.ts
import { useEffect, useState } from 'react';
export const useDebounce = <T>(value: T, delay = 300): T => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return (): void => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};
