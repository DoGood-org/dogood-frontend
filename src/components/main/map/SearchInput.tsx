'use client';
import { Faders, Search } from '@/components/icons';
import { Input } from '@/components/ui/Input';
import React, { useState, useEffect } from 'react';
import { Filters, FilterPannel, renderFilterButtons } from '@/components';

const SearchInput: React.FC = () => {
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
    <div className="bg-toggle py-6 lg:bg-transparent lg:py-0 lg:absolute lg:flex lg:top-12 lg:left-32 lg:z-[500]">
      <FilterPannel
        selectedCategories={selectedCategories}
        selectedDistances={selectedDistances}
        selectedCategoryButtons={selectedCategoryButtons}
        selectedDistanceButtons={selectedDistanceButtons}
      />
      <div className="relative flex items-center justify-center mx-auto w-[328px] md:w-[608px] lg:w-[487px]">
        <Search className="absolute left-5 stroke-black dark:stroke-white fill-black dark:fill-white w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
        <Input
          type="text"
          placeholder="Search..."
          className="bg-background lg:bg-toggle shadow-lg border-none rounded-none lg:rounded-[20px] px-5 py-[20px] text-base italic pl-[50px] focus:ring focus:ring-background h-12 placeholder-black dark:placeholder-white"
        />
        <Faders
          className="absolute stroke-foreground stroke-1 right-[18px] w-[16px] h-[16px] lg:w-[24px] lg:h-[24px] z-[600]"
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
export default SearchInput;
