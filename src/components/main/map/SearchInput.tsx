import { Search } from '@/components/icons';
import { Input } from '@/components/ui/Input';
import React from 'react';

const SearchInput = () => {
  return (
    <div className="absolute flex top-4 left-4 z-[1000] w-[250px]">
      <div className="relative flex items-center w-[250px]">
        <Search className="absolute left-2 fill-gray-500" />{' '}
        <Input
          type="text"
          placeholder="Search"
          className="bg-white border border-gray-300 rounded-md shadow-sm p-2 pl-9 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" /* Add left padding to make space for the icon */
        />
      </div>
    </div>
  );
};

export default SearchInput;
