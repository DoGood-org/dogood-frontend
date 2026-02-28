'use client';

import { IExtendedITaskProps } from '@/types/tasks.type';
import { Link } from '@/i18n/navigation';
import { TaskActionButtons } from '@/components/tasks/taskPage/ButtonGroup/TaskActionButtons';
import { TaskCategoryList } from '../../createPage/TaskCategoryList/TaskCategoryList';
import { useTaskDistance } from '@/hooks/useTaskDistance';

export const OtherTaskItem: React.FC<IExtendedITaskProps> = ({
  id,
  title,
  description,
  category,
  location,
  actionType,
  userParticipationStatus,
  isHost,
  status,
}) => {
  const distance = useTaskDistance(location);
  return (
    <div className="border p-4 rounded-lg bg-card flex flex-col min-h-[270px]">
      <div className="relative min-h-[100px]">
        <div className="h-[44px] overflow-hidden mb-2">
          <Link href={`/tasks/${id}`}>
            <h3
              className="text-[20px] leading-[20px] tracking-[0]
              underline decoration-1 line-clamp-2
              decoration-black/40 hover:decoration-black
              dark:decoration-white/50 dark:hover:decoration-white
              transition-colors duration-300"
            >
              {title}
            </h3>
          </Link>
        </div>
        <p className="text-base tracking-[0] line-clamp-2">{description}</p>
      </div>

      <div className="mt-auto">
        <div className="flex justify-between items-center">
          <TaskCategoryList categories={category} hideDonation />
          <div className="flex-shrink-0">
            {distance ? (
              <span className="text-sm font-semibold text-text-gray whitespace-nowrap">
                {distance}
              </span>
            ) : (
              <span className="text-xs text-gray-400 italic"> -- km</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-auto">
        <TaskActionButtons
          taskId={id}
          category={category}
          actionType={actionType}
          userParticipationStatus={userParticipationStatus}
          isHost={Boolean(isHost)}
          taskStatus={status}
          className="min-w-[114px] max-w-[130px] w-full"
        />
      </div>
    </div>
  );
};
