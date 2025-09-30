'use client';

import { ITaskDetails } from '@/types/tasks.type';
import { ImagePlaceholder } from './ImagePlaceholder';
import { Clock, DateIcon, Location } from '@/components/icons';
import { DonationProgressBar } from '@/components';

interface TaskCardProps {
  task: ITaskDetails;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const goalAmount = 10000;
  return (
    <section className="mb-5 md:flex">
      <ImagePlaceholder className="md:w-[324px]" />
      <div className="rounded-lg py-8 px-6 w-[354px] h-[418px] bg-[#D2D5D5] dark:bg-[#2A2D2D]">
        <div className="py-6 px-5">
          <ul className=" flex flex-col gap-5 text_tag mb-5">
            <li>
              <h2 className="text-[20px] font-bold leading-[20px] tracking-[0]">
                {task.title}
              </h2>
            </li>
            <li className="flex items-center gap-2">
              <DateIcon />
              <p className="text_tag text-base">Start: {task.startDate}</p>
            </li>
            <li className="flex items-center gap-2">
              <DateIcon />
              <p className="text_tag text-base">Finish: {task.endDate}</p>
            </li>
            <li className="flex items-center gap-2">
              <Clock />
              <p className="text_tag text-base">
                Time: {task.startTime} (local time)
              </p>
            </li>
            <li className="flex items-center gap-2">
              <Location />
              <p className="text_tag text-base">
                Location:
                {task.locationName}
              </p>
            </li>
          </ul>
          <h3 className="mb-4 text-base text-[#00c1ac] font-semibold">
            Donation needs {goalAmount}$
          </h3>
          <div className="flex flex-col items-center justify-center">
            <DonationProgressBar currentAmount={7500} goalAmount={10000} />
          </div>
        </div>
      </div>
    </section>
  );
};
