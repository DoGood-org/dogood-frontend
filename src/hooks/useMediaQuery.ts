'use client';

import { useEffect, useState } from 'react';
import { useIsMounted } from './useIsMounted';

export function useMediaQuery(query: string): boolean {
  const isMounted = useIsMounted();
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!isMounted) return;

    const media = window.matchMedia(query);

    const update = (): void => setMatches(media.matches);

    update();

    media.addEventListener('change', update);
    return (): void => media.removeEventListener('change', update);
  }, [query, isMounted]);

  // ❗ ДО mount завжди повертаємо стабільне значення
  if (!isMounted) return false;

  return matches;
}
