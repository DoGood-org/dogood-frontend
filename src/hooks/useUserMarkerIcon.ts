import { useEffect, useState } from 'react';
import type L from 'leaflet';
import { useTranslations } from 'next-intl';
import userAvatarMarker from '@/assets/svg/UserAvatarMarker.svg';

const DESKTOP_QUERY = '(min-width: 1024px)';

const SIZE_DESKTOP = { w: 56, h: 73 };
const SIZE_MOBILE = { w: 42, h: 54 };

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

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

type MarkerUser = {
  name?: string;
  avatar?: string | null;
  avatarUrl?: string;
} | null;

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export const useUserMarkerIcon = (user: MarkerUser): L.DivIcon | null => {
  const [icon, setIcon] = useState<L.DivIcon | null>(null);
  const isDesktop = useIsDesktop();
  const t = useTranslations('map');

  const isLoggedIn = !!user;
  const name = user?.name ?? '';
  const avatarUrl = user?.avatar ?? user?.avatarUrl ?? null;

  const label = isLoggedIn ? getInitials(name) : t('myPosition');

  useEffect(() => {
    let cancelled = false;
    const { w, h } = isDesktop ? SIZE_DESKTOP : SIZE_MOBILE;
    const avatarSize = Math.round(w * 0.6);

    (async (): Promise<void> => {
      const Leaflet = (await import('leaflet')).default;
      if (cancelled) return;

      const markerSrc =
        typeof userAvatarMarker === 'string'
          ? userAvatarMarker
          : userAvatarMarker.src;

      const inner = avatarUrl
        ? `<img src="${escapeHtml(avatarUrl)}" alt=""
             style="position:absolute;top:38.5%;left:50%;transform:translate(-50%,-50%);
                    width:${avatarSize}px;height:${avatarSize}px;
                    border-radius:50%;object-fit:cover;border:2px solid #fff;
                    box-sizing:border-box;" />`
        : `<span style="
             position:absolute;
             top:38.5%;
             left:50%;
             transform:translate(-50%,-50%);
             color:#FFFFFF;
             font-size:${isDesktop ? 16 : 14}px;
             font-weight:400;
             font-family:Roboto, Arial, sans-serif;
             line-height:22px;
             white-space:nowrap;
           ">${escapeHtml(label)}</span>`;

      const html = `
        <div style="position:relative;width:${w}px;height:${h}px;">
          <img
            src="${markerSrc}"
            width="${w}"
            height="${h}"
            alt=""
            style="position:absolute;inset:0;width:100%;height:100%;display:block; filter:drop-shadow(5px 9px 7px rgba(0,0,0,0.35));"
          />
          ${inner}
        </div>
      `;

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
  }, [isDesktop, label, avatarUrl]);

  return icon;
};
