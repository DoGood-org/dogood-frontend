'use client';

import { useEffect, useState } from 'react';

type UseDebouncedSearchProps = {
  minLength?: number;
  delay?: number;
};

export type UseDebouncedSearchReturn = {
  input: string;
  search: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

export const useDebouncedSearch = ({
  minLength = 3,
  delay = 500,
}: UseDebouncedSearchProps = {}): UseDebouncedSearchReturn => {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const value = input.trim();

      if (value.length >= minLength || value.length === 0) {
        setSearch(value);
      }
    }, delay);

    return (): void => clearTimeout(timeout);
  }, [input, minLength, delay]);

  return {
    input,
    search,
    setInput,
  };
};
