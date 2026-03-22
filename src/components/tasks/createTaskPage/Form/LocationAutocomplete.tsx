'use client';

import { useState, JSX, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from './FormField';
import { Input } from '@/components/ui/Input';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { MOCK_LOCATIONS_SEARCH } from '@/components/main/map/mockTasks';
import { useTranslations } from 'next-intl';

interface LocationData {
  address: string;
  lat: number;
  lng: number;
}

export interface NominatimResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
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

export const LocationSearchInput = ({
  name,
  label,
  onSelect,
}: LocationSearchInputProps): JSX.Element => {
  const t = useTranslations('tasks.createTask.form');

  const { watch, setValue } = useFormContext();
  const value = watch(name) ?? '';
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const setLocationData = useFilterStore((s) => s.setLocationData);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (q: string): void => {
    setValue(name, q, { shouldDirty: true });
    setValue('location', null);
    setLocationData(null);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (q.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      const res = MOCK_LOCATIONS_SEARCH.filter((l) =>
        l.display_name.toLowerCase().includes(q.toLowerCase())
      );
      setSuggestions(res);
      setIsOpen(res.length > 0);
      setActiveIndex(-1);
    }, 300);
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

  const handleSelect = (item: NominatimResult): void => {
    const loc = { address: item.display_name, lat: +item.lat, lng: +item.lon };
    setValue(name, item.display_name, {
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
                    key={item.place_id}
                    onMouseDown={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`cursor-pointer p-3 border-b last:border-none transition-colors 
                      ${index === activeIndex ? 'bg-[#999999]' : 'bg-text-gray'} text-white`}
                  >
                    {item.display_name}
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
