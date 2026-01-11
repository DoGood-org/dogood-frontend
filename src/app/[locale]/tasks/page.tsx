// import { CreateTask } from '@/components/tasks/CreatePage/CreateTask';

const TaskPage: React.FC = () => {
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
          // w-full
          // max-w-[1440px]     // Обмежуємо ширину, щоб на великих моніторах не роз'їжджалося
          // mx-auto            // ЦЕ ГОЛОВНЕ: центрує блок по горизонталі (Margin X Auto             // Відступ збоку для мобільних
          // md:pl-[60px]       // Відступ збоку для планшетів
          // lg:pl-[100px] 
  "
    >
      {/* <CreateTask /> */}
    </div>
  );
};

export default TaskPage;
