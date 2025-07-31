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
import React, { JSX, useState } from 'react';
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
  const [dragHeight, setDragHeight] = useState<number>(0);
  useClickOutside({
    ref: ref,
    callback: (): void => {
      if (activePanel) setActivePanel(null);
    },
    options: {
      enabled: !!activePanel,
      detectEscapeKey: true,
      ignoreSelectors: ['.leaflet-popup-task', '.leaflet-popup'],
    },
  });
  const { isDesktop } = useWindowSize();
  const dragLimit = 500 * -1;
  return (
    <>
      {!fullscreenMap && (
        <motion.div
          animate={{
            y: !isDesktop && activePanel ? dragLimit : 0,
          }}
          onDrag={(e, info) => {
            const offsetY = info.offset.y;
            let newHeight = dragHeight;

            if (offsetY < 0) {
              newHeight = Math.min(500, dragHeight + Math.abs(offsetY));
            } else if (offsetY > 0) {
              newHeight = Math.max(dragHeight, dragHeight - offsetY);
            }

            setDragHeight(newHeight);
          }}
          initial={{ y: 0 }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          className={`${props.className} touch-none cursor-grab bg-card`}
          ref={ref}
          drag={isDesktop ? false : 'y'}
          dragConstraints={
            isDesktop ? undefined : { top: dragLimit, bottom: 0 }
          }
          dragElastic={0.2}
          dragMomentum={false}
          onDragStart={() => {
            if (!isDesktop && activePanel === null) {
              setActivePanel('tasks');
            }
          }}
          onDragEnd={(e, info) => {
            if (isDesktop) return;
            const velocityY = info.velocity.y;
            const SNAP_THRESHOLD = 200;

            if (info.delta.y < -SNAP_THRESHOLD || velocityY < -300) {
              setActivePanel(activePanel === 'tasks' ? 'filters' : 'tasks');
            }

            if (info.delta.y > SNAP_THRESHOLD || velocityY > 300) {
              setActivePanel(null);
              setDragHeight(0);
            }
          }}
        >
          <div className="flex flex-col bg-card w-full rounded-sm lg:w-[487px]">
            <ButtonOpenTasks className="dragToggle mx-auto bg-card h-10 lg:hidden" />
            <FormSearch
              className="p-0 bg-card border-t border-t-foreground lg:border-t-0  lg:border-b lg:border-b-foreground lg:rounded-t-none"
              inputClassName="h-10 overflow-hidden"
              leftSVGClassName="left-0"
              rightSVGClassName="right-0"
            />
            <ButtonOpenTasks
              className="hidden md:hidden lg:inline-flex lg:bg-card lg:h-10 lg:mb-0 lg:z-500 lg:w-full"
              onClick={() => togglePanel('tasks')}
            />
          </div>

          <motion.div
            animate={{
              height:
                isDesktop && activePanel
                  ? 745 // or whatever your fixed height is
                  : dragHeight,
            }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {activePanel === 'filters' && (
                <motion.div
                  className="w-full h-full relative bg-card "
                  key="filters"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Filters
                    tasks={noPaginatedTasks}
                    className="w-full bg-card"
                  />
                </motion.div>
              )}

              {activePanel === 'tasks' && (
                <motion.div
                  key="tasks"
                  className="w-full h-full relative bg-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <TasksList
                    tasks={noPaginatedTasks}
                    className="w-full bg-card"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
