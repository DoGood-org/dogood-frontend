'use client';
import { Filters } from '@/components/main/map/filters/Filters';
import { FormSearch } from '@/components/main/map/filters/FormSearch';
import { ButtonOpenTasks } from '@/components/main/map/tasksPanel/ButtonOpenTasks';
import { TasksList } from '@/components/main/map/tasksPanel/TasksList';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useMapStore } from '@/zustand/stores/mapStore';
import { AnimatePresence, motion } from 'framer-motion';
import React, { JSX } from 'react';
import { IExtendedITaskProps } from '@/types/tasks.type';

type Props = {
  className?: string;
  tasks: IExtendedITaskProps[];
  mapHeight: number;
  mapOnMain?: boolean;
};

export const TasksOnMap = (props: Props): JSX.Element => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { activePanel, setActivePanel, fullscreenMap, togglePanel } =
    useMapStore();

  const { isDesktop } = useWindowSize();

  useClickOutside({
    ref: ref,
    callback: (): void => {
      if (activePanel) setActivePanel(null);
    },
    options: {
      enabled: !!activePanel && isDesktop,
      detectEscapeKey: true,
      ignoreSelectors: ['.leaflet-popup-task', '.leaflet-popup'],
    },
  });

  if (fullscreenMap) return <></>;

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      className={`${props.className} p-0 rounded-none bg-[#E6E6E6] dark:bg-toggle`}
      ref={ref}
    >
      <div className="bg-[#E6E6E6] dark:bg-toggle">
        <div className="flex flex-col bg-[#E6E6E6] dark:bg-toggle px-3 pt-3 pb-2 md:px-5 md:pt-5 md:pb-3 lg:p-0 rounded-sm">
          <FormSearch
            className="p-0 bg-[#E6E6E6] bg-[#171b19] dark:bg-toggle border-0 lg:border-b lg:border-b-foreground lg:rounded-t-none"
            inputClassName="h-10 overflow-hidden py-0 lg:h-12 lg:py-3"
            leftSVGClassName="left-0"
            rightSVGClassName="right-0"
          />

          <ButtonOpenTasks
            className="mx-auto h-5 pt-3 lg:pt-0 lg:hidden"
            onClick={() => togglePanel('tasks')}
          />
          {activePanel !== 'filters' && (
            <ButtonOpenTasks
              className="hidden lg:inline-flex lg:bg-[#E6E6E6] lg:dark:bg-toggle lg:h-10 lg:mb-0 lg:z-500 lg:w-full"
              onClick={() => togglePanel('tasks')}
            />
          )}
        </div>

        <motion.div
          initial={false}
          animate={{ height: activePanel === 'filters' ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-0 overflow-hidden"
        >
          <AnimatePresence>
            {activePanel === 'filters' && (
              <motion.div
                className="w-full h-full relative bg-[#E6E6E6] dark:bg-toggle"
                key="filters"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Filters
                  tasks={props.tasks}
                  className="w-full bg-[#E6E6E6] dark:bg-toggle"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: activePanel === 'tasks' ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className={`custom-scrollbar-tasks mr-4 md:mr-5 min-h-0 ${
          activePanel === 'tasks' ? 'overflow-y-scroll' : 'overflow-hidden'
        }
        max-h-[795px] md:max-h-[802px] lg:max-h-[708px]
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:my-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:!bg-[#E8E8E8]:dark:!bg-[#303030]
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:!bg-[#999999]`}
      >
        <AnimatePresence>
          {activePanel === 'tasks' && (
            <motion.div
              key="tasks"
              className="w-full h-full relative bg-[#E6E6E6] px-4 dark:bg-toggle md:px-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TasksList
                tasks={props.tasks}
                className="w-full bg-[#E6E6E6] dark:bg-toggle"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
