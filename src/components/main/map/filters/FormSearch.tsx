'use client';
import { useForm } from 'react-hook-form';
import { Search, SlidersVertical, X } from 'lucide-react';
import { JSX, useEffect } from 'react';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { Button } from '@/components/ui/Button';

type FormData = { search: string };

export const FormSearch = (): JSX.Element => {
  const { setSearchActive } = useMapStore();
  const { toggleFilters } = useMapStore();
  const { setSearchQuery } = useFilterStore();

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    toggleFilters();

    e.nativeEvent.stopImmediatePropagation();
  };

  const { register, watch, reset } = useForm<FormData>();
  const searchValue = watch('search');
  useEffect(() => {
    const handler = setTimeout((): void => {
      setSearchQuery(searchValue || '');
    }, 500);
    setSearchActive(!!searchValue);

    return (): void => clearTimeout(handler);
  }, [searchValue, setSearchQuery, setSearchActive]);

  const handleClear = (): void => {
    reset({ search: '' });
    setSearchQuery('');
    setSearchActive(false);
  };

  return (
    <div className="bg-card w-full " itemRef="search">
      <form onSubmit={(e) => e.preventDefault()} className="w-full">
        <div className="relative p-3  overflow-hidden flex items-center justify-center lg:p-0 ">
          <Search className="absolute left-5  text-muted-foreground stroke-foreground w-6 h-6 lg:w-[24px] lg:h-[24px]" />
          <input
            {...register('search')}
            name="search"
            id="search"
            autoComplete="off"
            type="text"
            placeholder="Search.."
            className="w-full h-12 px-12 text-base italic bg-background text-foreground rounded-sm
        placeholder:font-normal placeholder:text-muted-foreground
        border-none outline-none focus:ring-0 focus:outline-none shadow-none
        disabled:pointer-events-none disabled:opacity-50 lg:bg-card"
            onBlur={(e) => {
              if (!e.target.value.trim()) setSearchActive(false);
            }}
            onFocus={() => setSearchActive(true)}
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0 m-0 cursor-pointer text-foreground"
              onClick={handleClear}
            >
              <X
                className="absolute z-25 right-13 w-5 h-5 cursor-pointer text-foreground"
                onClick={handleClear}
              />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute z-1000 right-6  p-0 m-0 cursor-pointer text-foreground"
            onClick={onButtonClick}
          >
            <SlidersVertical className="w-6 h-6 stroke-foreground text-foreground" />
          </Button>
        </div>
      </form>
    </div>
  );
};
