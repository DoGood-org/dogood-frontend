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
  onFilterButtonClick?: () => void;
};
export const FormSearch = ({
  className,
  inputClassName,
  leftSVGClassName,
  rightSVGClassName,
  onFilterButtonClick,
}: Props): JSX.Element => {
  const { togglePanel } = useMapStore();
  const { setSearchQuery, setSearchActive, searchIsActive } = useFilterStore();

  const { register, watch, reset } = useForm<FormData>();
  const searchValue = watch('search');

  useEffect(() => {
    setSearchActive(!!searchValue);
    setSearchQuery(searchValue || '');
  }, [searchValue, setSearchActive, setSearchQuery]);

  const onSearchButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation();
    setSearchQuery(searchValue || '');
  };
  const handleFilterButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation();
    togglePanel('filters');
    onFilterButtonClick?.();
  };

  const handleClear = (): void => {
    reset({ search: '' });
    setSearchQuery('');
  };

  return (
    <div className="bg-card w-full flex flex-col relative" itemRef="search">
      <form onSubmit={(e) => e.preventDefault()} className=" flex flex-col">
        <div className={` flex items-center justify-center ${className}`}>
          <Button
            id="searchButton"
            className={`absolute inline-flex items-center justify-center p-2  z-25 cursor-pointer text-foreground ${leftSVGClassName}`}
            onClick={onSearchButtonClick}
          >
            <Search className={'text-foreground stroke-foreground w-6 h-6'} />
          </Button>
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
      <Button
        variant="ghost"
        size="icon"
        id="filtersButton"
        className={`inline-flex items-center justify-center p-2 absolute top-0 z-25 cursor-pointer text-foreground ${rightSVGClassName}`}
        onClick={handleFilterButtonClick}
      >
        <SlidersVertical className="w-6 h-6 stroke-foreground text-foreground" />
      </Button>
    </div>
  );
};
