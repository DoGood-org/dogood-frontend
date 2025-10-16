'use client';

import { IExtendedITaskProps } from '@/types/tasks.type';
import { TaskActionButtons } from '../ButtonGroup/TaskActionButtons';
import { TaskCategoryIconsList } from '@/components/main/map/tasksPanel/TaskCategoryIconList';

export const OtherTskItem: React.FC<IExtendedITaskProps> = ({
  id,
  title,
  subtitle,
  category,
  distance,
  actionType,
  userParticipationStatus,
}) => {
  return (
    <div className="min-w-[350px] p-4 border rounded-lg bg-card">
      <h3 className="text-base text-[20px] leading-[20px] tracking-[0] mb-5">
        {title}
      </h3>
      <h4 className="text-base tracking-[0] mb-5">{subtitle}</h4>

      <div className="flex justify-between items-center mb-4">
        <TaskCategoryIconsList categories={category} />
        {distance && <span className="text-base">{distance}</span>}
      </div>

      <div className="flex justify-between space-x-2">
        <TaskActionButtons
          taskId={id}
          actionType={actionType}
          userParticipationStatus={userParticipationStatus}
          className="min-w-[114px] max-w-[130px]"
        />
      </div>
    </div>
  );
};
