'use client';

import { ITaskDetails } from '@/types/tasks.type';
import Image from 'next/image';
import Link from 'next/link';
import { Location } from '@/components/icons';

interface TaskDetailsProps {
  task: ITaskDetails;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  return (
    <section>
      <h2 className="text-lg mb-5">{task.title}</h2>
      <h3 className="text-[20px] leading-[20px] mb-5">Details:</h3>

      <div className="flex gap-3 mb-5">
        <div className="w-[80px] h-[80px] bg-[#00c1ac]"></div>
        <div>
          <h3 className="mb-3 text-base">
            <span className="font-semibold">Location: </span>
            {task.locationName}
          </h3>
          <div className="flex gap-2 mb-2">
            <Link
              href="https://www.google.com/maps/search/?api=1&query=Willow+Creek,+Oregon2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 group"
            >
              <Location className="stroke-[#00c1ac] transition-colors duration-300 group-hover:stroke-[#999999]" />
              <span className="cursor-pointer underline text-base text-[#00c1ac] transition-colors duration-300 group-hover:text-[#999999]">
                Show on map
              </span>
            </Link>
          </div>
          <div className="flex gap-3">
            <Image
              src={task.picture || '/task/no-image.png'}
              alt="Task image"
              width={48}
              height={48}
              className="w-[48px] h-[48px] rounded-full object-cover"
            />
            <Link
              href={`/profile/${task.organizationId}`}
              className="flex items-center gap-1"
            >
              <span className="cursor-pointer underline text-base hover:text-btn-hover">
                Organized by{''} Felix
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative pt-5 pb-10">
        <span className="absolute top-0 left-0 h-px w-full bg-text-gray"></span>
        <h3 className="text-[20px] leading-[20px] mb-5">Description</h3>
        <p className="text-base">{task.description}</p>
        <span className="absolute bottom-0 left-0 h-px w-full bg-text-gray"></span>
      </div>

      <div className="relative py-5 px-3">
        <h3 className="text-[20px] leading-[20px] mb-2">How You Can Help: </h3>
        <h4 className="text-base font-medium mb-2">Donation needs: </h4>
        <span className="block text-base mb-6">10000 USD</span>
        <h4 className="text-base font-medium mb-2">Requitments </h4>
        <p>{task.requirements}</p>
      </div>
    </section>
  );
};
