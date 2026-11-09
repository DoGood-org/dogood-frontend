import { JSX } from 'react';

const PARK = 'bg-[#D5F5E5] dark:bg-[#30483C]';
const LAND = 'bg-[#F5F1E8] dark:bg-[#3C3B33]';
const WATER = 'bg-[#A9E1F0] dark:bg-[#315B68]';
const MINOR_ROAD = 'bg-white dark:bg-[#59615D]';
const MAIN_ROAD = 'bg-[#D5DFE9] dark:bg-[#52616A]';
const CONTROL = 'bg-white dark:bg-[#414945]';

const AREAS = [
  `-left-10 top-[-5%] h-[45%] w-[35%] rounded-[40%] ${PARK}`,
  `right-[-5%] top-[15%] h-[55%] w-[38%] rounded-[35%] ${PARK}`,
  `bottom-[-10%] left-[5%] h-[35%] w-[25%] rounded-[40%] ${PARK}`,
  `right-[5%] top-[-10%] h-[35%] w-[25%] rounded-[40%] ${LAND}`,
  `bottom-[5%] right-[-5%] h-[30%] w-[35%] rounded-[40%] ${LAND}`,
  `left-[58%] top-[20%] h-[65%] w-5 rotate-[12deg] rounded-full ${WATER}`,
  `left-[45%] top-[5%] h-2 w-[35%] rotate-[8deg] rounded-full ${WATER}`,
];

const ROADS = [
  // minor
  `left-0 right-0 top-[30%] h-[3px] ${MINOR_ROAD}`,
  `left-0 right-0 top-[65%] h-[3px] ${MINOR_ROAD}`,
  `bottom-0 left-[25%] top-0 w-[3px] ${MINOR_ROAD}`,
  `bottom-0 left-[72%] top-0 w-[3px] ${MINOR_ROAD}`,
  // main
  `-left-[10%] top-[45%] h-[7px] w-[120%] rotate-[-12deg] ${MAIN_ROAD}`,
  `-left-[5%] top-[80%] h-[6px] w-[110%] rotate-[20deg] ${MAIN_ROAD}`,
];

export const MapSkeleton = (): JSX.Element => (
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading map"
    className="relative h-full w-full overflow-hidden bg-[#EEF0F2] dark:bg-[#303735]"
  >
    {AREAS.map((cls) => (
      <div key={cls} className={`absolute ${cls}`} />
    ))}

    {ROADS.map((cls) => (
      <div key={cls} className={`absolute ${cls}`} />
    ))}

    <div className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-black/10 motion-reduce:animate-none dark:bg-white/10" />

    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
      <div className={`size-10 rounded-full shadow-sm ${CONTROL}`} />
      <div className={`size-10 rounded-full shadow-sm ${CONTROL}`} />
    </div>
  </div>
);
