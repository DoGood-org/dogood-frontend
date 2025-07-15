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
  const { layerDropIsOpen, activeLayer, setActiveLayer, toggleLayerDrop } =
    useMapStore();
  const handleOptionSelect = (
    optionId: string,
    e?: React.MouseEvent | React.KeyboardEvent
  ): void => {
    setActiveLayer(optionId as EnumMapLayers);
    console.info(layerDropIsOpen, 'Layer dropdown is open');
    if (layerDropIsOpen && e && 'stopPropagation' in e) {
      e.stopPropagation();
    }

    toggleLayerDrop();
  };

  return (
    <div
      className={`inline-flex flex-col items-start gap-2 p-4 bg-[var(--map-btn-bg)] rounded-sm ${className}`}
      role="menu"
    >
      {dropdownOptions.map((option) => (
        <div
          key={option.id}
          className="flex flex-col gap-2 px-4 py-2 cursor-pointer"
          role="menuitem"
          tabIndex={0}
          onClick={(e) => {
            handleOptionSelect(option.id, e);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleOptionSelect(option.id, e);
            }
          }}
          aria-selected={activeLayer === option.id}
        >
          <div className="flex items-center gap-2">
            <Button
              key={option.id}
              variant={'ghost'}
              className=" p-0 w-6 h-6  rounded-full border-map-btn-icon mr-2"
              onClick={(e) => {
                handleOptionSelect(option.id, e);
              }}
            >
              <span
                className={`text-xs font-medium rounded-full  border-transparent ${activeLayer === option.id ? 'bg-btn-hover' : 'bg-transparent'} p-[6px]`}
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
