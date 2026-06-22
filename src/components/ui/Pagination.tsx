'use client';

import { ChevronLeft, ChevronRight } from '@/components/icons';
import { cn } from '@/lib/utils';
import { JSX } from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps): JSX.Element => {
  const prevPage = (): void => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = (): void => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return <></>;
  }

  return (
    <div
      className={cn('flex items-center justify-center gap-4 mt-6', className)}
    >
      {/* LEFT ARROW  */}
      <button
        onClick={prevPage}
        disabled={currentPage === 0}
        className={`transition p-1 ${
          currentPage === 0
            ? 'opacity-30 cursor-auto'
            : 'hover:scale-110 cursor-pointer'
        }`}
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>

      {/* PAGINATION DOTS  */}
      <div className="flex items-center gap-[18px]">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className="p-[7px]"
            onClick={() => onPageChange(idx)}
          >
            <span
              className={`w-[10px] h-[10px] block rounded-full border border-foreground transition cursor-pointer ${
                currentPage === idx ? 'bg-foreground' : 'border-foreground'
              }`}
            />
          </button>
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages - 1}
        className={`transition p-1 ${
          currentPage === totalPages - 1
            ? 'opacity-30 cursor-auto'
            : 'hover:scale-110 cursor-pointer'
        }`}
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>
    </div>
  );
};
