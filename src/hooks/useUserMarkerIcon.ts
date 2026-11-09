import { useEffect, useState } from 'react';
import type L from 'leaflet';
import myPin from '@/assets/images/map/my-pin.png';

const PIN_SRC = typeof myPin === 'string' ? myPin : myPin.src;

const PIN_W = 42;
const PIN_H = 58;

const AVATAR_SIZE = Math.round(PIN_W * 0.42);
const AVATAR_TOP = '30%';

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

type MarkerUser = {
  avatar?: string | null;
  avatarUrl?: string;
} | null;

export const useUserMarkerIcon = (user: MarkerUser): L.DivIcon | null => {
  const [icon, setIcon] = useState<L.DivIcon | null>(null);

  const avatarUrl = user?.avatar ?? user?.avatarUrl ?? null;

  useEffect(() => {
    let cancelled = false;

    (async (): Promise<void> => {
      const Leaflet = (await import('leaflet')).default;
      if (cancelled) return;

      const avatar = avatarUrl
        ? `<img src="${escapeHtml(avatarUrl)}" alt=""
             style="position:absolute;top:${AVATAR_TOP};left:50%;
                    transform:translate(-50%,-50%);
                    width:${AVATAR_SIZE}px;height:${AVATAR_SIZE}px;
                    border-radius:50%;object-fit:cover;" />`
        : '';

      const html = `
        <div style="position:relative;width:${PIN_W}px;height:${PIN_H}px;">
          <img src="${PIN_SRC}" width="${PIN_W}" height="${PIN_H}" alt=""
               style="position:absolute;inset:0;width:100%;height:100%;display:block;filter:drop-shadow(4px 3px 5px rgba(0,0,0,0.28));" />
          ${avatar}
        </div>
      `;

      setIcon(
        Leaflet.divIcon({
          html,
          className: '',
          iconSize: [PIN_W, PIN_H],
          iconAnchor: [PIN_W / 2, PIN_H],
          popupAnchor: [0, -PIN_H],
        })
      );
    })();

    return (): void => {
      cancelled = true;
    };
  }, [avatarUrl]);

  return icon;
};
