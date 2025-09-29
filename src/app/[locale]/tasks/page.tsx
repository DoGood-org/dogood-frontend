import {
  generateMockTasks,
  generateTasks,
  OtherTasksSection,
} from '@/components';
import {
  ITaskDetails,
  TaskActionType,
  UserParticipationStatus,
} from '@/types/tasks.type';

const TaskPage: React.FC = () => {
  const tasks = generateTasks(49.8429, 24.0316);
  const otherTasksList: ITaskDetails[] = generateMockTasks(tasks).map(
    (task) => ({
      ...task,
      // Призначаємо обов'язкові поля для компонента TaskActionButtons
      actionType: TaskActionType.VOLUNTEERING,
      userParticipationStatus: UserParticipationStatus.NONE,
    })
  );
  return (
    <div
      className=" 
  bg-background
      px-[4px]
      pt-[168px]
  pb-[64px]
  my-container
  w-full
  min-h-[calc(100dvh-160px)]
text-foreground  
  flex
  flex-col
  items-center
  justify-center
  "
    >
      <OtherTasksSection tasks={otherTasksList} />
    </div>
  );
};

export default TaskPage;
