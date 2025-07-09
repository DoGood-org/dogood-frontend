'use client';
import { useForm } from 'react-hook-form';
import { Search, SlidersVertical, X } from 'lucide-react';
import { JSX, useEffect } from 'react';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useFilterStore } from '@/zustand/stores/filterStore';

type FormData = { search: string };

export const FormSearch = (): JSX.Element => {
  const { toggleFilters } = useMapStore();
  const { setSearchQuery } = useFilterStore();

  const { register, watch, reset } = useForm<FormData>();
  const searchValue = watch('search');
  useEffect(() => {
    const handler = setTimeout((): void => {
      setSearchQuery(searchValue || '');
    }, 500);

    return (): void => clearTimeout(handler);
  }, [searchValue, setSearchQuery]);

  const handleClear = (): void => {
    reset({ search: '' });
    setSearchQuery('');
  };

  return (
    <div className="bg-card w-full ">
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
              register('search').onBlur(e);
              reset();
            }}
          />
          {searchValue && (
            <X
              className="absolute z-25 right-13 w-5 h-5 cursor-pointer text-muted-foreground hover:text-foreground"
              onClick={handleClear}
            />
          )}
          <span
            className="absolute right-6 bg-transparent p-0 m-0"
            onClick={toggleFilters}
          >
            <SlidersVertical className="w-6 h-6 stroke-foreground text-muted-foreground" />
          </span>
        </div>
      </form>
    </div>
  );
};
