'use client';

import { IExtendedITaskProps } from '@/types/tasks.type';
import { TaskActionButtons } from '../ButtonGroup/TaskActionButtons';
import { TaskCategoryIconsList } from '@/components/main/map/tasksPanel/TaskCategoryIconList';
import { Link } from '@/i18n/navigation';

export const OtherTaskItem: React.FC<IExtendedITaskProps> = ({
  id,
  title,
  subtitle,
  category,
  distance,
  actionType,
  userParticipationStatus,
  isHost,
  status,
}) => {
  return (
    <div className="border p-4 rounded-lg bg-card flex flex-col min-h-[270px]">
      <Link href={`/tasks/${id}`}>
        <h3 className="text-base text-[20px] leading-[20px] tracking-[0] mb-5">
          {title}
        </h3>
      </Link>
      <h4 className="text-base tracking-[0] mb-5">{subtitle}</h4>

      <div className="flex justify-between items-center mb-4">
        <TaskCategoryIconsList categories={category} />
        {distance && <span className="text-base">{distance}</span>}
      </div>

      <div className="flex justify-between space-x-2 mt-auto">
        <TaskActionButtons
          taskId={id}
          actionType={actionType}
          userParticipationStatus={userParticipationStatus}
          isHost={Boolean(isHost)}
          taskStatus={status}
          className="min-w-[114px] max-w-[130px]"
        />
      </div>
    </div>
  );
};
