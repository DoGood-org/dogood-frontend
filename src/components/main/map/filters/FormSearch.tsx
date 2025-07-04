'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Search, SlidersHorizontal, SlidersVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { JSX, useEffect } from 'react';

type Props = {
  toggleFilters: () => void;
};

type FormData = { search: string };

export const FormSearch = (props: Props): JSX.Element => {
  const { toggleFilters } = props;

  const { register, watch, reset } = useForm<FormData>();
  const searchValue = watch('search');
  useEffect(() => {
    const handler = setTimeout((): void => {
      if (searchValue?.trim()) {
        console.log('debounced', searchValue);
      }
    }, 300);

    return (): void => {
      clearTimeout(handler);
      reset();
    };
  }, [searchValue, reset]);

  return (
    <div className="border bg-card lg:bg-transparent lg:py-0 lg:absolute lg:flex lg:top-12 lg:left-32 lg:z-[500]">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="relative overflow-hidden rounded-sm flex items-center justify-center mx-auto w-full md:w-[608px] lg:w-[487px] p-3">
          <Search className="absolute left-5 stroke-foreground w-6 h-6 lg:w-[24px] lg:h-[24px]" />
          <Input
            {...register('search')}
            name="search"
            id="search"
            autoComplete="off"
            type="text"
            placeholder="Search.."
            className="bg-background shadow-lg border-none rounded-sm text-base italic focus:ring focus:ring-background h-12  pl-[44px] 
            placeholder:font-normal placeholder:text-gray"
          />
          <span
            className="absolute right-6 bg-transparent p-0 m-0"
            onClick={toggleFilters}
          >
            <SlidersVertical className="w-6 h-6 stroke-foreground" />
          </span>
        </div>
      </form>
    </div>
  );
};
