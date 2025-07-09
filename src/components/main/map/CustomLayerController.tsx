'use client';
import { Button } from '@/components/ui/Button';
import { EnumMapLayers } from '@/types/mapType';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX } from 'react';

const dropdownOptions = [
  {
    id: EnumMapLayers.OpenStreetMap,
    label: 'Default',
    selected: false,
  },
  {
    id: EnumMapLayers.Satellite,
    label: 'Satellite',
    selected: false,
  },
  {
    id: EnumMapLayers.GoogleMaps,
    label: 'Hybrid',
    selected: true,
  },
];

type Props = {
  className?: string;
};
export const CustomLayerController = ({
  className = '',
}: Props): JSX.Element => {
  const baseLayer = useMapStore((state) => state.baseLayer);
  const setBaseLayer = useMapStore((state) => state.setBaseLayer);

  const handleOptionSelect = (optionId: string): void => {
    setBaseLayer(optionId as EnumMapLayers);
  };

  return (
    <div
      className={`inline-flex flex-col items-start gap-2 p-4 bg-[var(--map-btn-bg)] rounded-sm ${className}`}
      role="menu"
    >
      {dropdownOptions.map((option) => (
        <div
          key={option.id}
          className="flex flex-col gap-2 px-4 py-2"
          role="menuitem"
          tabIndex={0}
          onClick={() => {
            handleOptionSelect(option.id);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOptionSelect(option.id);
            }
          }}
          aria-selected={baseLayer === option.id}
        >
          <div className="flex items-center gap-2">
            <Button
              key={option.id}
              variant={'ghost'}
              className=" p-0 w-6 h-6  rounded-full border-map-btn-icon mr-2"
              onClick={() => {
                handleOptionSelect(option.id);
              }}
            >
              <span
                className={`text-xs font-medium rounded-full  border-transparent ${baseLayer === option.id ? 'bg-btn-hover' : 'bg-transparent'} p-[6px]`}
              ></span>
            </Button>
            <span className="text-[var(--map-btn-icon)] text-base font-medium">
              {option.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CustomLayerController;
