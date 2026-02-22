'use client';

import { useTranslations } from 'next-intl';
import { ITaskDetails } from '@/types/tasks.type';
import { ImagePlaceholder } from './ImagePlaceholder';
import { Clock, DateIcon, Location } from '@/components/icons';
import { DonationProgressBar } from './DonationProgressBar';

interface TaskCardProps {
  task: ITaskDetails;
}

const formatTime = (isoString?: string): string => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  console.log(task);
  const t = useTranslations('tasks');

  const donation = 10000;
  const donationGoal = (task as any).goalAmount ?? 0;
  const collected = task.amount ?? 0;

  const taskInfo = [
    {
      icon: <DateIcon />,
      label: `${t('taskCard.start')}: ${task.startDate ?? 'N/A'}`,
    },
    {
      icon: <DateIcon />,
      label: `${t('taskCard.finish')}: ${task.endDate ?? 'N/A'}`,
    },
    {
      icon: <Clock />,
      label: `${t('taskCard.time')}: ${formatTime(task.startTime)} ${t('taskCard.localTime')}`,
    },
    {
      icon: <Location />,
      label: `${t('taskCard.location')}: ${task.locationName ?? 'Unknown'}`,
    },
  ];

  return (
    <section className="mb-5 md:flex lg:flex lg:flex-col">
      <ImagePlaceholder
        imageUrl={task.picture ?? undefined}
        className="md:w-[324px] lg:w-[400px] lg:h-[500px] lg:mb-2"
      />
      <div className="rounded-lg py-8 px-6 w-[354px] lg:w-[400px] bg-[#D2D5D5] dark:bg-[#2A2D2D]">
        <div className="py-6 px-5">
          <ul className="flex flex-col gap-5 text_tag text-base mb-5">
            <li>
              <h2 className="text-[20px] font-bold leading-[20px] tracking-[0]">
                {task.title}
              </h2>
            </li>
            {taskInfo.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <p className="text_tag text-base">{item.label}</p>
              </li>
            ))}
          </ul>
          <h3 className="mb-4 text-base text-[#00c1ac] font-semibold">
            {t('taskCard.donationNeeds')} {donation}$
          </h3>
          <div className="flex flex-col items-center justify-center">
            <DonationProgressBar
              currentAmount={collected}
              goalAmount={donationGoal}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
