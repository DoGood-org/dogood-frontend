import { Button } from '@/components/ui/Button';
import { useMapStore } from '@/zustand/stores/mapStore';
import { Layers } from 'lucide-react';
import { JSX } from 'react';

export const ButtonLayers = (): JSX.Element => {
  const toggleLayerDrop = useMapStore((state) => state.toggleLayerDrop);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    toggleLayerDrop();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-12 h-12 flex items-center justify-center rounded-sm p-0 bg-[var(--map-btn-bg)] cursor-pointer border-0 border-[var(--map-btn-border)]"
    >
      <span className="text-[var(--map-btn-icon)] hover:text-btn-hover ">
        <Layers className=" w-6 h-6" />
      </span>
    </button>
  );
};
