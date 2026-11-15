'use client';

import { useState, JSX, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslations, useLocale } from 'next-intl';
import { FormField } from './FormField';
import { Input } from '@/components/ui/Input';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useMapStore } from '@/zustand/stores/mapStore';

interface LocationData {
  address: string;
  lat: number;
  lng: number;
}

export interface PhotonFeature {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    osm_id: number;
    name?: string;
    street?: string;
    housenumber?: string;
    city?: string;
    town?: string;
    village?: string;
    district?: string;
    county?: string;
    state?: string;
    country?: string;
  };
}

interface LocationSearchInputProps {
  name: string;
  label: string;
  onSelect?: (location: LocationData) => void;
}

const locationInputClasses =
  'bg-white h-[48px] text-base text-black placeholder-black ' +
  'py-3 px-2 rounded-sm border-2 border-[#999999] ' +
  'focus-visible:ring-0 focus-visible:ring-offset-0 w-full ' +
  'autofill:bg-white autofill:text-black';

export const formatLocation = (item: PhotonFeature): string => {
  const p = item.properties;

  const city = p.city || p.town || p.village || p.district || p.county || '';

  const streetName = p.street || (p.name !== city ? p.name : '');
  const street = [streetName, p.housenumber].filter(Boolean).join(' ');

  const parts = [
    street,
    city && city !== street ? city : null,
    p.country && p.country !== city ? p.country : null,
  ].filter(Boolean);

  return parts.join(', ');
};

const removeDuplicates = (items: PhotonFeature[]): PhotonFeature[] => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const formatted = formatLocation(item);
    if (!formatted) return false;
    const key = formatted.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const LocationSearchInput = ({
  name,
  label,
  onSelect,
}: LocationSearchInputProps): JSX.Element => {
  const t = useTranslations('tasks.createTask.form');
  const lang = useLocale().split('-')[0];

  const userLocation = useMapStore((s) => s.userLocation);
  const defaultLocation = useMapStore((s) => s.defaultLocation);
  const currentCenter = userLocation ?? defaultLocation;

  const { watch, setValue } = useFormContext();
  const value = watch(name) ?? '';
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<PhotonFeature[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const locationData = useFilterStore((s) => s.locationData);
  const setLocationData = useFilterStore((s) => s.setLocationData);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (locationData && !value) {
      setValue(name, locationData.address, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('location', {
        lat: locationData.lat,
        lng: locationData.lng,
      });
    }
  }, [locationData, name, setValue, value]);

  const handleSearch = (q: string): void => {
    setValue(name, q, { shouldDirty: true });
    setValue('location', null);
    setLocationData(null);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    const query = q.trim();

    if (query.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          q: query,
          limit: '8',
          lang: lang,
        });

        if (currentCenter) {
          params.append('lat', String(currentCenter.lat));
          params.append('lon', String(currentCenter.lng));
        }

        const res = await fetch(`https://photon.komoot.io/api/?${params}`);
        if (!res.ok) throw new Error(`Photon ${res.status}`);

        const data: { features: PhotonFeature[] } = await res.json();
        const unique = removeDuplicates(data.features ?? []);

        setSuggestions(unique);
        setIsOpen(unique.length > 0);
        setActiveIndex(-1);
      } catch (e) {
        console.error('Location search failed', e);
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (!isOpen) return;
    const actions: Record<string, () => void> = {
      ArrowDown: () =>
        setActiveIndex((p) => Math.min(p + 1, suggestions.length - 1)),
      ArrowUp: () => setActiveIndex((p) => Math.max(p - 1, 0)),
      Enter: () => activeIndex >= 0 && handleSelect(suggestions[activeIndex]),
      Escape: () => setIsOpen(false),
    };
    if (actions[e.key]) {
      e.preventDefault();
      actions[e.key]();
    }
  };

  const handleSelect = (item: PhotonFeature): void => {
    const address = formatLocation(item);
    const [lng, lat] = item.geometry.coordinates;
    const loc = { address, lat, lng };

    setValue(name, address, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue('location', { lat: loc.lat, lng: loc.lng });
    setLocationData(loc);
    onSelect?.(loc);
    setIsOpen(false);
  };

  return (
    <FormField name={name} label={label} required>
      {(field) => (
        <div className="relative">
          <Input
            id={name}
            value={value}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={field.onBlur}
            onFocus={() => suggestions.length > 0 && setIsOpen(true)}
            placeholder={t('location')}
            autoComplete="off"
            className={locationInputClasses}
          />
          {isOpen && suggestions.length > 0 && (
            <>
              <div
                className="fixed inset-0 z-[90]"
                onClick={() => setIsOpen(false)}
              />
              <ul className="absolute z-[100] mt-1 w-full overflow-hidden rounded-sm border border-[#999999] bg-white shadow-lg">
                {suggestions.map((item, index) => (
                  <li
                    key={`${item.properties.osm_id}-${index}`}
                    onMouseDown={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`cursor-pointer p-3 border-b last:border-none transition-colors 
                      ${index === activeIndex ? 'bg-[#999999]' : 'bg-text-gray'} text-white`}
                  >
                    {formatLocation(item)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </FormField>
  );
};
