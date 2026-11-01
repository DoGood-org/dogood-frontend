import { useEffect, useState } from 'react';
import type L from 'leaflet';

const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

type MarkerUser = {
  avatar?: string | null;
  avatarUrl?: string;
  name?: string;
} | null;

const DESKTOP_QUERY = '(min-width: 1024px)';
const SIZE_DESKTOP = { w: 64, h: 83 };
const SIZE_MOBILE = { w: 48, h: 62 };

const useIsDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = (): void => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return (): void => mq.removeEventListener('change', update);
  }, []);

  return isDesktop;
};

export const useUserMarkerIcon = (user: MarkerUser): L.DivIcon | null => {
  const [icon, setIcon] = useState<L.DivIcon | null>(null);
  const isDesktop = useIsDesktop();

  const avatarUrl = user?.avatar ?? user?.avatarUrl ?? null;
  const name = user?.name ?? '';
  const isLoggedIn = !!user;

  useEffect(() => {
    if (!isLoggedIn) {
      setIcon(null);
      return;
    }

    let cancelled = false;
    const { w, h } = isDesktop ? SIZE_DESKTOP : SIZE_MOBILE;

    (async (): Promise<void> => {
      const Leaflet = (await import('leaflet')).default;
      if (cancelled) return;

      const letter = escapeHtml(name.trim()[0]?.toUpperCase() ?? '?');

      const content = avatarUrl
        ? `<image href="${escapeHtml(avatarUrl)}" x="7" y="7" width="30" height="30"
             preserveAspectRatio="xMidYMid slice" clip-path="url(#userPinClip)" />`
        : `<text x="22" y="28" text-anchor="middle" font-size="18" font-weight="600"
             font-family="sans-serif" fill="#374151">${letter}</text>`;

      const html = `
        <svg viewBox="0 0 44 56" width="${w}" height="${h}"
             preserveAspectRatio="xMidYMax meet"
             xmlns="http://www.w3.org/2000/svg"
             style="display:block;overflow:visible;">
          <defs>
            <clipPath id="userPinClip"><circle cx="22" cy="22" r="15" /></clipPath>
          </defs>
          <path d="M22 0C9.8 0 0 9.8 0 22c0 16 22 34 22 34s22-18 22-34C44 9.8 34.2 0 22 0z" fill="#EE0606"/>
          <circle cx="22" cy="22" r="17" fill="#fff"/>
          ${content}
        </svg>`;

      setIcon(
        Leaflet.divIcon({
          html,
          className: '',
          iconSize: [w, h],
          iconAnchor: [w / 2, h],
          popupAnchor: [0, -h + 6],
        })
      );
    })();

    return (): void => {
      cancelled = true;
    };
  }, [isLoggedIn, avatarUrl, name, isDesktop]);

  return icon;
};
