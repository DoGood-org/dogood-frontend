'use client';
import { Search } from '@/components/icons';
import { Input } from '@/components/ui/Input';
import { Settings } from 'lucide-react';
import React, { useState } from 'react';
import { Filters } from './Filters';

export const SearchInput = () => {
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);

  const toggleFilters = () => {
    setIsSettingOpen(!isSettingOpen);
  };
  return (
    <div className="absolute flex top-4 left-4 z-[1000]">
      <div className="relative flex items-center  w-[478px]">
        <Search className="absolute left-5 stroke-card fill-card w-[30px] h-[30px]" />
        <Input
          type="text"
          placeholder="Search"
          className=" bg-white shadow-lg border-none rounded-[20px] px-5 py-[20px] text-base pl-[70px] focus:ring focus:ring-background w-full min-h-[60px]"
        />
        <Settings
          className="absolute stroke-card stroke-1 right-[14px] w-[32px] h-[32px]"
          onClick={toggleFilters}
        />
      </div>
      {isSettingOpen && <Filters setIsSettingOpen={setIsSettingOpen} />}
    </div>
  );
};
