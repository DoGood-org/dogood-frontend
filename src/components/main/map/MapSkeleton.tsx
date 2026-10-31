import { JSX } from 'react';

export const MapSkeleton = (): JSX.Element => (
  <div
    className="relative h-full w-full overflow-hidden bg-[#F3F5F5] dark:bg-[#252B29]"
    aria-busy="true"
    aria-label="Loading map"
  >
    {/* Map areas */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[#EEF0F2] dark:bg-[#303735]" />

      {/* Green areas */}
      <div className="absolute -left-10 top-[-5%] h-[45%] w-[35%] rounded-[40%] bg-[#D5F5E5] dark:bg-[#30483C]" />
      <div className="absolute right-[-5%] top-[15%] h-[55%] w-[38%] rounded-[35%] bg-[#D5F5E5] dark:bg-[#30483C]" />
      <div className="absolute bottom-[-10%] left-[5%] h-[35%] w-[25%] rounded-[40%] bg-[#D5F5E5] dark:bg-[#30483C]" />

      {/* Beige areas */}
      <div className="absolute right-[5%] top-[-10%] h-[35%] w-[25%] rounded-[40%] bg-[#F5F1E8] dark:bg-[#3C3B33]" />
      <div className="absolute bottom-[5%] right-[-5%] h-[30%] w-[35%] rounded-[40%] bg-[#F5F1E8] dark:bg-[#3C3B33]" />

      {/* Water */}
      <div className="absolute left-[58%] top-[20%] h-[65%] w-5 rotate-[12deg] rounded-full bg-[#A9E1F0] dark:bg-[#315B68]" />
      <div className="absolute left-[45%] top-[5%] h-2 w-[35%] rotate-[8deg] rounded-full bg-[#A9E1F0] dark:bg-[#315B68]" />
    </div>

    {/* Minor roads */}
    <div className="absolute left-0 right-0 top-[30%] h-[3px] bg-white dark:bg-[#59615D]" />
    <div className="absolute left-0 right-0 top-[65%] h-[3px] bg-white dark:bg-[#59615D]" />
    <div className="absolute bottom-0 left-[25%] top-0 w-[3px] bg-white dark:bg-[#59615D]" />
    <div className="absolute bottom-0 left-[72%] top-0 w-[3px] bg-white dark:bg-[#59615D]" />

    {/* Main roads */}
    <div className="absolute -left-[10%] top-[45%] h-[7px] w-[120%] rotate-[-12deg] bg-[#D5DFE9] dark:bg-[#52616A]" />
    <div className="absolute -left-[5%] top-[80%] h-[6px] w-[110%] rotate-[20deg] bg-[#D5DFE9] dark:bg-[#52616A]" />

    {/* Location marker */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="absolute -inset-5 animate-ping rounded-full bg-[#339AF0]/20 motion-reduce:animate-none" />
      <div className="relative flex size-8 items-center justify-center rounded-full border-[4px] border-white bg-[#339AF0] shadow-md">
        <div className="size-2 rounded-full bg-white" />
      </div>
    </div>

    {/* Map controls */}
    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
      <div className="size-10 rounded-full bg-white shadow-sm dark:bg-[#414945]" />
      <div className="size-10 rounded-full bg-white shadow-sm dark:bg-[#414945]" />
    </div>
  </div>
);
