'use client';

import { IExtendedITaskProps } from '@/types/tasks.type';
import { TaskActionButtons } from '../ButtonGroup/TaskActionButtons';
import { TaskCategoryIconsList } from '@/components/main/map/tasksPanel/TaskCategoryIconList';
// import { useTranslations } from 'next-intl';

export const OtherTskItem: React.FC<IExtendedITaskProps> = ({
  id,
  title,
  subtitle,
  category,
  distance,
  actionType,
  userParticipationStatus,
}) => {
  // const t = useTranslations('map');

  return (
    <li className="flex-shrink-0 w-[350px] p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition duration-200">
      <h3 className="text-base font-semibold text-gray-800 line-clamp-2 min-h-[40px]">
        {title}
      </h3>
      <h4 className="text-sm text-gray-500 mb-3 line-clamp-1 min-h-[20px]">
        {subtitle}
      </h4>

      <div className="flex justify-between items-center mb-4">
        <TaskCategoryIconsList categories={category} />
        {distance && (
          <span className="text-xs font-medium text-gray-600">{distance}</span>
        )}
      </div>

      {/* Кнопки - використовуємо TaskActionButtons */}
      <div className="flex justify-between space-x-2">
        <TaskActionButtons
          taskId={id}
          actionType={actionType}
          userParticipationStatus={userParticipationStatus}
          className="w-[114px]"
        />
      </div>
    </li>
  );
};
