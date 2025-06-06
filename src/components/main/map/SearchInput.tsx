'use client';
import { Search, Settings } from '@/components/icons';
import { Input } from '@/components/ui/Input';
import React, { useState, useEffect } from 'react';
import { Filters, FilterPannel, renderFilterButtons } from '@/components';

export const SearchInput: React.FC = () => {
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);

  //Initialize states of Categories and Distances from localStorage, if there is nothing - empty array
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const savedCategories = localStorage.getItem('Categories');
    return savedCategories ? JSON.parse(savedCategories) : [];
  });
  const [selectedDistances, setSelectedDistances] = useState<string[]>(() => {
    const savedDistances = localStorage.getItem('Distances');
    return savedDistances ? JSON.parse(savedDistances) : [];
  });

  // Save to localStorage when categories o distances change
  useEffect(() => {
    localStorage.setItem('Categories', JSON.stringify(selectedCategories));
    localStorage.setItem('Distances', JSON.stringify(selectedDistances));
  }, [selectedCategories, selectedDistances]);

  //Toggle for Filters Component
  const toggleFilters = (): void => {
    setIsSettingOpen(!isSettingOpen);
  };

  //Handle Category's Button Click
  const handleCategoryToggle = (id: string): void => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  //Handle Distance's Button Click
  const handleDistanceToggle = (id: string): void => {
    setSelectedDistances((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  //Function for Render Category and Distance Buttons for Filter Panel
  const selectedCategoryButtons = renderFilterButtons({
    items: selectedCategories,
    onRemove: handleCategoryToggle,
    keyPrefix: 'category',
  });
  const selectedDistanceButtons = renderFilterButtons({
    items: selectedDistances,
    onRemove: handleDistanceToggle,
    keyPrefix: 'distance',
  });

  return (
    <div className="absolute flex top-12 left-12 z-[500]">
      <FilterPannel
        selectedCategories={selectedCategories}
        selectedDistances={selectedDistances}
        selectedCategoryButtons={selectedCategoryButtons}
        selectedDistanceButtons={selectedDistanceButtons}
      />
      <div className="relative flex items-center w-[313px] md:w-[358px] xl:w-[478px]">
        <Search className="absolute left-5 stroke-black dark:stroke-white fill-black dark:fill-white w-[30px] h-[30px]" />
        <Input
          type="text"
          placeholder="Search"
          className="bg-background shadow-lg border-none rounded-[20px] px-5 py-[20px] text-base  pl-[70px] focus:ring focus:ring-background w-full min-h-[60px] placeholder-black dark:placeholder-white"
        />
        <Settings
          className="absolute stroke-black stroke-1 right-[14px] w-[32px] h-[32px] z-[600] dark:stroke-white"
          onClick={toggleFilters}
        />
      </div>
      {isSettingOpen && (
        <Filters
          setIsSettingOpen={setIsSettingOpen}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          selectedDistances={selectedDistances}
          onDistanceToggle={handleDistanceToggle}
        />
      )}
    </div>
  );
};
