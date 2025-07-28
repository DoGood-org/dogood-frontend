'use client';
import { Filters } from '@/components/main/map/filters/Filters';
import { FormSearch } from '@/components/main/map/filters/FormSearch';
import { ButtonOpenTasks } from '@/components/main/map/tasksPanel/ButtonOpenTasks';
import { TasksList } from '@/components/main/map/tasksPanel/TasksList';
import { AnimatedDrawler } from '@/components/ui/AnimatedDrawler';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';
import { useMapStore } from '@/zustand/stores/mapStore';
import { AnimatePresence, motion } from 'framer-motion';
import React, { JSX } from 'react';

type Props = {
  className?: string;
};
export const TasksOnMap = (props: Props): JSX.Element => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { activePanel, setActivePanel, fullscreenMap } = useMapStore();

  const { noPaginatedTasks } = useFilteredTasksSelector();

  useClickOutside({
    ref: ref,
    callback: (): void => {
      if (activePanel) setActivePanel(null);
      console.log('Closing panel', activePanel);
    },
    options: {
      enabled: !!activePanel,
      detectEscapeKey: true,
      ignoreSelectors: ['.leaflet-popup-task', '.leaflet-popup'],
    },
  });
  const { isMobile, isTablet, isDesktop, height } = useWindowSize();
  const dragTop = isMobile ? -100 : isTablet ? -120 : undefined;

  const computedHeight =
    activePanel && isMobile
      ? `${(height ?? 0) - 354 - 100 - 80}px`
      : activePanel && isTablet
        ? `${(height ?? 0) - 518 - 120 - 120}px`
        : '680px';

  return (
    <>
      {!fullscreenMap && (
        <motion.div
          onClick={(e) => {
            e.stopPropagation();
            console.log('TasksOnMap clicked');
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className={`${props.className} touch-none cursor-grab bg-card`}
          ref={ref}
          drag={isDesktop ? false : 'y'}
          dragConstraints={
            isDesktop || dragTop === undefined ? undefined : { top: dragTop }
          }
          dragElastic={0.2}
          dragMomentum={false}
          initial={{ y: isDesktop ? 0 : (dragTop ?? 0) }}
          animate={activePanel && !isDesktop ? {} : { y: 0 }}
          onDragStart={() => {
            if (!isDesktop && activePanel === null) {
              setActivePanel('tasks');
            }
          }}
          onDragEnd={(e, info) => {
            if (isDesktop) return;

            const dragY = info.offset.y;
            const velocityY = info.velocity.y;

            if (dragY > 80 || velocityY > 800) {
              setActivePanel(null);
            } else if (dragY < -80 || velocityY < -800) {
              setActivePanel('tasks');
            }
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex flex-col bg-card w-full rounded-sm lg:w-[485px]">
            <FormSearch
              className="p-0 bg-card border-b border-b-foreground"
              inputClassName="h-10 overflow-hidden"
              leftSVGClassName="left-0"
              rightSVGClassName="right-0"
            />
            <ButtonOpenTasks className="mx-auto bg-card h-10 lg:mb-0 lg:z-500  lg:h-10  lg:border-t lg:border-t-foreground  lg:w-full  lg:hover:border-t-foreground" />
          </div>
          <AnimatedDrawler
            isVisible={!!activePanel}
            onClose={() => {
              setActivePanel(null);
            }}
            direction="vertical"
            className={`
      bg-card flex flex-col w-full overflow-hidden
      lg:mt-0
      lg:w-[487px]
   `}
          >
            <div
              className={'transition-all duration-300 ease-in-out'}
              style={{ height: computedHeight }}
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
            </div>
          </AnimatedDrawler>
        </motion.div>
      )}
    </>
  );
};
