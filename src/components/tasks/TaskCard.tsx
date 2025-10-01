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

  const taskInfo = [
    { icon: <DateIcon />, label: `Start: ${task.startDate}` },
    { icon: <DateIcon />, label: `Finish: ${task.endDate}` },
    { icon: <Clock />, label: `Time: ${task.startTime} (local time)` },
    { icon: <Location />, label: `Location: ${task.locationName}` },
  ];

  return (
    <section className="mb-5 md:flex lg:flex lg:flex-col">
      <ImagePlaceholder className="md:w-[324px] lg:w-[400px] lg:h-[500px] mb-2" />
      <div className="rounded-lg py-8 px-6 w-[354px] lg:w-[400px] bg-[#D2D5D5] dark:bg-[#2A2D2D]">
        <div className="py-6 px-5">
          <ul className="flex flex-col gap-5 text_tag text-base mb-5">
            <li>
              <h2 className="text-[20px] font-bold leading-[20px] tracking-[0]">
                {task.title}
              </h2>
            </li>
            {taskInfo.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                {item.icon}
                <p className="text_tag text-base">{item.label}</p>
              </li>
            ))}
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
