'use client';
import { useForm } from 'react-hook-form';
import { Search, SlidersVertical, X } from 'lucide-react';
import { JSX, useEffect } from 'react';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { Button } from '@/components/ui/Button';

type FormData = { search: string };
type Props = {
  className?: string;
  inputClassName?: string;
  leftSVGClassName?: string;
  rightSVGClassName?: string;
};
export const FormSearch = ({
  className,
  inputClassName,
  leftSVGClassName,
  rightSVGClassName,
}: Props): JSX.Element => {
  const { togglePanel } = useMapStore();
  const { setSearchQuery, setSearchActive, searchIsActive } = useFilterStore();

  const { register, watch, reset } = useForm<FormData>();
  const searchValue = watch('search');
  useEffect(() => {
    const handler = setTimeout((): void => {
      setSearchQuery(searchValue || '');
    }, 500);

    return (): void => clearTimeout(handler);
  }, [searchValue, setSearchQuery]);

  useEffect(() => {
    setSearchActive(!!searchValue);
  }, [searchValue, setSearchActive]);

  const onSearchButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation();
    setSearchQuery(searchValue || '');
    e.nativeEvent.stopImmediatePropagation();
  };
  const onFilterButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    togglePanel('filters');
  };

  const handleClear = (): void => {
    reset({ search: '' });
    setSearchQuery('');
  };

  return (
    <div className="bg-card w-full relative" itemRef="search">
      <form onSubmit={(e) => e.preventDefault()} className="w-full">
        <div
          className={` overflow-hidden flex items-center justify-center ${className}`}
        >
          <button
            id="searchButton"
            className={`absolute inline-flex items-center justify-center p-2  z-25 cursor-pointer text-foreground ${leftSVGClassName}`}
            onClick={onSearchButtonClick}
          >
            <Search className={'text-foreground stroke-foreground w-6 h-6'} />
          </button>
          <input
            {...register('search')}
            name="search"
            id="search"
            autoComplete="off"
            type="text"
            placeholder="Search.."
            className={`${searchIsActive ? 'cursor-default' : 'cursor-grab'}
            px-10
            w-full text-base italic bg-card text-foreground rounded-sm
        placeholder:font-normal placeholder:text-muted-foreground
        border-none outline-none focus:ring-0 focus:outline-none shadow-none
        disabled:pointer-events-none disabled:opacity-50 ${inputClassName}`}
            onBlur={(e) => {
              if (!e.target.value.trim()) {
                console.log('blurr');
                setSearchQuery('');
                setSearchActive(false);
              }
            }}
            onFocus={() => setSearchActive(true)}
          />
          {searchValue && (
            <Button
              id="clearSearchButton"
              variant="ghost"
              size="icon"
              className="absolute w-6 right-9 top-1/2 -translate-y-1/2 p-0 m-0 cursor-pointer text-foreground"
              onClick={handleClear}
            >
              <X
                className="w-4 h-4 cursor-pointer text-foreground"
                onClick={handleClear}
              />
            </Button>
          )}
        </div>
      </form>
      <button
        id="filtersButton"
        className={`inline-flex items-center justify-center p-2 absolute top-0 z-25 cursor-pointer text-foreground ${rightSVGClassName}`}
        onClick={onFilterButtonClick}
      >
        <SlidersVertical className="w-6 h-6 stroke-foreground text-foreground" />
      </button>
    </div>
  );
};
