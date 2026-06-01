// 'use client';

// import { useEffect, useState } from 'react';

// export function useMediaQuery(query: string): boolean {
//   const [matches, setMatches] = useState(false);

//   useEffect((): (() => void) => {
//     const media = window.matchMedia(query);
//     if (media.matches !== matches) {
//       setMatches(media.matches);
//     }
//     const listener = (): void => setMatches(media.matches);
//     media.addEventListener('change', listener);
//     return () => media.removeEventListener('change', listener);
//   }, [matches, query]);

//   return matches;
// }

// 'use client';

// import { useEffect, useState } from 'react';

// export function useMediaQuery(query: string): boolean {
//   const [matches, setMatches] = useState<boolean | null>(null);

//   useEffect(() => {
//     const media = window.matchMedia(query);

//     const update = (): void => setMatches(media.matches);

//     update(); // одразу встановлюємо правильне значення

//     media.addEventListener('change', update);
//     return (): void => media.removeEventListener('change', update);
//   }, [query]);

//   return matches ?? false; // fallback для SSR
// }

// 'use client';

// import { useEffect, useState } from 'react';

// export function useMediaQuery(query: string): {
//   matches: boolean;
//   isReady: boolean;
// } {
//   const [matches, setMatches] = useState(false);
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     const media = window.matchMedia(query);

//     const update = (): void => setMatches(media.matches);

//     update();
//     setIsReady(true);

//     media.addEventListener('change', update);
//     return (): void => media.removeEventListener('change', update);
//   }, [query]);

//   return { matches, isReady };
// }

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
