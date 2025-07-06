'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
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
    <div className="border bg-card lg:bg-transparent lg:py-0 lg:absolute lg:flex lg:top-12 lg:left-32 lg:z-[500]">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="relative overflow-hidden rounded-sm flex items-center justify-center mx-auto w-full md:w-[608px] lg:w-[487px] p-3">
          <Search className="absolute left-5  text-muted-foreground stroke-foreground w-6 h-6 lg:w-[24px] lg:h-[24px]" />
          <Input
            {...register('search')}
            name="search"
            id="search"
            autoComplete="off"
            type="text"
            placeholder="Search.."
            className=" bg-background shadow-lg border-none rounded-sm text-base italic focus:ring focus:ring-background h-12  px-[44px] 
            placeholder:font-normal "
            onBlur={(e) => {
              register('search').onBlur(e);
              console.log('Search input blurred', searchValue);
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
