'use client';
import { Filters } from '@/components/main/map/filters/Filters';
import { FormSearch } from '@/components/main/map/filters/FormSearch';
import { ButtonOpenTasks } from '@/components/main/map/tasksPanel/ButtonOpenTasks';
import { TasksList } from '@/components/main/map/tasksPanel/TasksList';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';
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
  const { noPaginatedTasks } = useFilteredTasksSelector();
  const { isDesktop } = useWindowSize();

  useClickOutside({
    ref: ref,
    callback: (): void => {
      if (activePanel) setActivePanel(null);
    },
    options: {
      // на моб/планшеті панель під картою — закриваємо лише кнопкою
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
      className={`${props.className} md:bg-card`}
      ref={ref}
    >
      <div
        className={`md:bg-card md:p-0 md:rounded-none ${
          activePanel === 'filters'
            ? 'bg-modal dark:bg-[#171b19] py-8 px-5 rounded-md'
            : 'bg-card'
        }`}
      >
        <div className="flex flex-col bg-card rounded-sm px-5 pt-5 pb-3 lg:p-0">
          <FormSearch
            className="p-0 bg-card border-0 lg:border-b lg:border-b-foreground lg:rounded-t-none"
            inputClassName="h-10 overflow-hidden py-0 lg:h-12 lg:py-3"
            leftSVGClassName="left-0"
            rightSVGClassName="right-0"
          />

          {/* стрілка під пошуком — моб/планшет */}
          <ButtonOpenTasks
            className="mx-auto bg-card h-5 pt-3 lg:pt-0 lg:hidden"
            onClick={() => togglePanel('tasks')}
          />

          {/* кнопка на всю ширину — десктоп */}
          {activePanel !== 'filters' && (
            <ButtonOpenTasks
              className="hidden lg:inline-flex lg:bg-card lg:h-10 lg:mb-0 lg:z-500 lg:w-full"
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
                className="w-full h-full relative bg-card"
                key="filters"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Filters tasks={noPaginatedTasks} className="w-full bg-card" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: activePanel === 'tasks' ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-0 overflow-y-scroll custom-scrollbar-tasks max-h-[70vh] lg:max-h-[100vh] mr-5 md:mr-6"
      >
        <AnimatePresence>
          {activePanel === 'tasks' && (
            <motion.div
              key="tasks"
              className="w-full h-full relative bg-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TasksList tasks={noPaginatedTasks} className="w-full bg-card" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
