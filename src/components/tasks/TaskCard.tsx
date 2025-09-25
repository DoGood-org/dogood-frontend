'use client';

import React from 'react';
import { ITaskDetails } from '@/types/tasks.type';
import { ImagePlaceholder } from './ImagePlaceholder';
import { Clock, DateIcon, Location } from '@/components/icons';

interface TaskCardProps {
  task: ITaskDetails;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <section>
      <ImagePlaceholder />
      <div className="rounded-lg py-8 px-6 w-[353px] h-[418px] bg-[#D2D5D5] dark:bg-[#2A2D2D] ">
        <ul className=" flex flex-col gap-5 py-6 px-5 text_tag">
          <li>
            <h2 className="text-[20px] font-bold leading-[20px] tracking-[0]">
              {task.title}
            </h2>
          </li>
          <li className="flex items-center gap-2">
            <DateIcon />
            <p className="text_tag .text-base">Start: {task.startDate}</p>
          </li>
          <li className="flex items-center gap-2">
            <DateIcon />
            <p className="text_tag .text-base">Finish: {task.endDate}</p>
          </li>
          <li className="flex items-center gap-2">
            <Clock />
            <p className="text_tag .text-base">Time: {task.startTime}</p>
          </li>
          <li className="flex items-center gap-2">
            <Location />
            <p className="text_tag .text-base">
              Location:
              {task.locationName}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
