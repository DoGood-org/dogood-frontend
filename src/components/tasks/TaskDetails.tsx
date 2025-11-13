'use client';

import { ITaskDetails } from '@/types/tasks.type';
import Image from 'next/image';
import Link from 'next/link';
import { Location } from '@/components/icons';
import { useTranslations } from 'next-intl';
import {
  getOrganizerInfo,
  parseDescription,
  parseRequirements,
} from '@/utils/tasks';
import { Button } from '../ui/Button';
import { useMapStore } from '@/zustand/stores/mapStore';
import { LatLngLiteral } from 'leaflet';
import EditButton from './ButtonGroup/EditButton';

interface TaskDetailsProps {
  task: ITaskDetails;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  const t = useTranslations('tasks');
  const flyToCoords = useMapStore((s) => s.flyToCoords);

  const hasCoords = task.lat != null && task.lng != null;

  const taskCoords: LatLngLiteral = hasCoords
    ? { lat: task.lat as number, lng: task.lng as number }
    : { lat: 48.8566, lng: 2.3522 };

  const handleShowOnMap = (): void => {
    if (hasCoords) flyToCoords(taskCoords, 17);
  };

  const { name: organizerName, link: organizerLink } = getOrganizerInfo(task);
  const parsedRequirements = parseRequirements(task.requirements);
  const parsedDescription = parseDescription(task.description);

  const handleEdit = (): void => {
    console.log('Editing task now!');
  };

  return (
    <section>
      <div className="flex align-baseline space-x-3">
        <h2 className="text-lg mb-5 mr-5">{task.title}</h2>
        <EditButton onClick={handleEdit} />
      </div>
      <h3 className="text-[20px] leading-[20px] mb-5">
        {t('taskDetails.details')}:
      </h3>
      <div className="flex gap-3 mb-5">
        {/* !!!!add mini map !!!!*/}
        <div className="w-[80px] h-[80px] bg-[#00c1ac]"></div>

        <div>
          <div className="flex flex-col md:flex-row md:gap-6">
            <h3 className="mb-3 text-base">
              <span className="font-semibold">
                {t('taskDetails.location')}:
              </span>{' '}
              {task.locationName}
            </h3>
            <div className="flex gap-2 mb-2 md:mb-6">
              {hasCoords && (
                <Button
                  type="button"
                  variant="iconOnly"
                  onClick={handleShowOnMap}
                  className="flex items-center gap-1 group"
                >
                  <Location className="text-[#00c1ac] transition-colors duration-300 group-hover:stroke-[#999999]" />
                  <span className="cursor-pointer underline text-base text-[#00c1ac] transition-colors duration-300 group-hover:text-[#999999]">
                    {t('taskDetails.showOnMap')}
                  </span>
                </Button>
              )}
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
              <Link href={organizerLink} className="flex items-center gap-1">
                <span className="cursor-pointer underline text-base hover:text-btn-hover">
                  {t('taskDetails.organizedBy')} {organizerName}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative pt-5 pb-10">
        <span className="absolute top-0 left-0 h-px w-full bg-text-gray"></span>
        <h3 className="text-[20px] leading-[20px] mb-5">
          {t('taskDetails.description')}
        </h3>
        {parsedDescription.map((line, idx) =>
          Array.isArray(line) ? (
            <ul key={idx} className="list-disc pl-8 space-y-1 text-base">
              {line.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p key={idx} className="text-base mb-4">
              {line}
            </p>
          )
        )}
        <span className="absolute bottom-0 left-0 h-px w-full bg-text-gray"></span>
      </div>

      <div className="relative py-5 px-3 mb-5">
        <h3 className="text-[20px] leading-[20px] mb-2">
          {t('taskDetails.howYouCanHelp')}:
        </h3>
        <h4 className="text-base font-medium mb-2">
          {t('taskDetails.donationNeeds')}:
        </h4>
        <span className="block text-base mb-6">10000 USD</span>
        {parsedRequirements.length > 0 && (
          <>
            <h4 className="text-base font-medium mt-3 mb-1">
              {t('taskDetails.requirements')}:
            </h4>
            <ul className="list-disc text-base pl-8">
              {parsedRequirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};
