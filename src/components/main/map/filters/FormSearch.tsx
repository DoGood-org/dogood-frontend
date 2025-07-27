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
  const { setSearchActive } = useMapStore();
  const { toggleFilters } = useMapStore();
  const { setSearchQuery } = useFilterStore();

  const { register, watch, reset } = useForm<FormData>();
  const searchValue = watch('search');
  useEffect(() => {
    const handler = setTimeout((): void => {
      setSearchQuery(searchValue || '');
    }, 500);
    setSearchActive(!!searchValue);

    return (): void => clearTimeout(handler);
  }, [searchValue, setSearchQuery, setSearchActive]);

  const onSearchButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation();
    setSearchQuery(searchValue || '');
    e.nativeEvent.stopImmediatePropagation();
  };
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    toggleFilters();

    e.nativeEvent.stopImmediatePropagation();
  };

  const handleClear = (): void => {
    reset({ search: '' });
    setSearchQuery('');
    setSearchActive(false);
  };

  return (
    <div className="bg-card w-full " itemRef="search">
      <form onSubmit={(e) => e.preventDefault()} className="w-full">
        <div
          className={`relative overflow-hidden flex items-center justify-center ${className}`}
        >
          {' '}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute z-1000 p-0 m-0 cursor-pointer text-foreground ${leftSVGClassName}`}
            onClick={onSearchButtonClick}
          >
            <Search
              className={
                'absolute text-muted-foreground stroke-foreground w-6 h-6'
              }
            />
          </Button>
          <input
            {...register('search')}
            name="search"
            id="search"
            autoComplete="off"
            type="text"
            placeholder="Search.."
            className={`w-full text-base italic bg-card text-foreground rounded-sm
        placeholder:font-normal placeholder:text-muted-foreground
        border-none outline-none focus:ring-0 focus:outline-none shadow-none
        disabled:pointer-events-none disabled:opacity-50 lg:bg-card ${inputClassName}`}
            onBlur={(e) => {
              if (!e.target.value.trim()) setSearchActive(false);
            }}
            onFocus={() => setSearchActive(true)}
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute w-6 right-9 top-1/2 -translate-y-1/2 p-0 m-0 cursor-pointer text-foreground"
              onClick={handleClear}
            >
              <X
                className="absolute z-25 w-4 h-4 cursor-pointer text-foreground"
                onClick={handleClear}
              />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute z-1000 p-0 m-0 cursor-pointer text-foreground ${rightSVGClassName}`}
            onClick={onButtonClick}
          >
            <SlidersVertical className="w-6 h-6 stroke-foreground text-foreground" />
          </Button>
        </div>
      </form>
    </div>
  );
};
