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
        {/* map !!!!*/}
        <div className="w-[80px] h-[80px] bg-[#00c1ac]"></div>

        <div>
          <div className="flex flex-col md:flex-row md:gap-6">
            <h3 className="mb-3 text-base">
              <span className="font-semibold">Location: </span>
              {task.locationName}
            </h3>
            <div className="flex gap-2 mb-2 md:mb-6">
              <Link
                href="https://www.google.com/maps/search/?api=1&query=Willow+Creek,+Oregon2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 group"
              >
                <Location className="text-[#00c1ac] transition-colors duration-300 group-hover:stroke-[#999999]" />
                <span className="cursor-pointer underline text-base text-[#00c1ac] transition-colors duration-300 group-hover:text-[#999999]">
                  Show on map
                </span>
              </Link>
            </div>
          </div>

          <ul className="flex gap-3">
            <li>
              <Image
                src={task.picture || '/task/no-image.png'}
                alt="Task image"
                width={48}
                height={48}
                className="w-[48px] h-[48px] rounded-full object-cover"
              />
            </li>
            <li>
              <Link
                href={`/profile/${task.organizationId}`}
                className="flex items-center gap-1"
              >
                <span className="cursor-pointer underline text-base hover:text-btn-hover">
                  Organized by{''} Felix
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative pt-5 pb-10">
        <span className="absolute top-0 left-0 h-px w-full bg-text-gray"></span>
        <h3 className="text-[20px] leading-[20px] mb-5">Description</h3>
        {task.description.split('\n').map((line: string, idx: number) => {
          const trimmed = line.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
            const items = trimmed
              .split(/(?:- |• )/)
              .filter(Boolean)
              .map((i) => i.trim());
            return (
              <ul key={idx} className="list-disc pl-8 space-y-1 text-base">
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-base mb-4">
              {trimmed}
            </p>
          );
        })}
        <span className="absolute bottom-0 left-0 h-px w-full bg-text-gray"></span>
      </div>

      <div className="relative py-5 px-3 mb-5">
        <h3 className="text-[20px] leading-[20px] mb-2">How You Can Help: </h3>
        <h4 className="text-base font-medium mb-2">Donation needs: </h4>
        <span className="block text-base mb-6">10000 USD</span>
        {task.requirements && (
          <>
            <h4 className="text-base font-medium mt-3 mb-1">Requirements:</h4>
            <ul className="list-disc text-base pl-8">
              {task.requirements
                .replace(/^Requirements:\s*/i, '')
                .split(/(?=[A-Z][a-z])/g)
                .filter(Boolean)
                .map((req, idx) => (
                  <li key={idx}>{req.trim()}</li>
                ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};
