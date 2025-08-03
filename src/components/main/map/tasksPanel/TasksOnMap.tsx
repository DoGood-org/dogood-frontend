'use client';
import { Filters } from '@/components/main/map/filters/Filters';
import { FormSearch } from '@/components/main/map/filters/FormSearch';
import { ButtonOpenTasks } from '@/components/main/map/tasksPanel/ButtonOpenTasks';
import { TasksList } from '@/components/main/map/tasksPanel/TasksList';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';
import { useMapStore } from '@/zustand/stores/mapStore';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import React, { JSX, useState } from 'react';
import { IExtendedITaskProps } from '@/types/tasks.type';
import { useDragControls } from 'framer-motion';

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
  const [dragHeight, setDragHeight] = useState<number>(0);
  const [snapped, setSnapped] = useState(false);
  const DRAG_Y = (props.mapHeight - 80) * -1; // 80 is the height of the header
  const SNAP = 270 * -1;
  const PANEL_HEIGHT = 270;
  const CLOSED_HEIGHT = 0;

  const controls = useAnimation();
  const dragControls = useDragControls();

  useClickOutside({
    ref: ref,
    callback: (): void => {
      if (activePanel) setActivePanel(null);
      close();
    },
    options: {
      enabled: !!activePanel,
      detectEscapeKey: true,
      ignoreSelectors: [
        '.leaflet-popup-task',
        '.leaflet-popup',
        '.leaflet-container',
        '.drag-tasks',
        '.dragToggle',
      ],
    },
  });

  // When you click “open”
  const open = (panel: 'tasks' | 'filters') => {
    setActivePanel(panel);
    setDragHeight(PANEL_HEIGHT);
    setSnapped(true);
    controls.start({
      y: SNAP,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
        mass: 0.3,
      },
    });
  };

  // When you click “close”
  const close = () => {
    setActivePanel(null);
    setSnapped(false);
    setDragHeight(0);
    controls.start({ y: CLOSED_HEIGHT });
  };

  const stretch = () => {
    if (snapped) {
      controls.start({
        y: DRAG_Y,
        transition: { type: 'spring', stiffness: 150, damping: 20, mass: 0.3 },
      });
    }
  };

  return (
    <>
      {!fullscreenMap && (
        <motion.div
          ref={ref}
          drag="y"
          className={`drag-tasks rounded-t-sm bg-card overflow-hidden touch-none ${props.className}`}
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={{ top: DRAG_Y, bottom: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          animate={controls} // use the controls, not a hardcoded y
          initial={{ y: 0 }}
          onDrag={(e, info) => {
            setDragHeight(Math.abs(info.offset.y) + dragHeight);
            stretch();
          }}
          onDragEnd={(_, info) => {
            const shouldOpen = info.offset.y < -150 || info.velocity.y < -300;
            const shouldClose = info.offset.y > 150 || info.velocity.y > 300;

            if (shouldOpen) open('tasks');
            else if (shouldClose) close();
            else controls.start({ y: activePanel ? SNAP : 0 });
          }}
          onPointerDown={(e) => {
            console.log('Pointer down on drag toggle');
            e.stopPropagation();
            dragControls.start(e);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="dragToggle cursor-grab flex flex-col bg-card w-full h-full rounded-sm lg:w-[487px]">
            <ButtonOpenTasks
              className="dragToggle mx-auto bg-card h-10 lg:hidden"
              dragListener={false}
              onClick={() => {
                activePanel === 'tasks' ? close() : open('tasks');
              }}
            />
            <FormSearch
              className="p-0 bg-card border-t border-t-foreground lg:border-t-0  lg:border-b lg:border-b-foreground lg:rounded-t-none"
              inputClassName="h-10 overflow-hidden"
              leftSVGClassName="left-0"
              rightSVGClassName="right-0"
              onFilterButtonClick={() => open('filters')}
            />
            <ButtonOpenTasks
              className="hidden md:hidden lg:inline-flex lg:bg-card lg:h-10 lg:mb-0 lg:z-500 lg:w-full"
              onClick={() => {
                togglePanel('tasks');
              }}
            />
          </div>

          <motion.div
            animate={{
              height: isDesktop && activePanel ? 745 : dragHeight,
            }}
            className="w-full relative bg-card"
          >
            <AnimatePresence mode="wait">
              {activePanel === 'filters' && (
                <motion.div
                  className="w-full relative bg-card "
                  key="filters"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Filters
                    tasks={noPaginatedTasks}
                    className="w-full relative bg-card"
                    onClose={() => {
                      setActivePanel(null);
                      controls.start({ y: 0 });
                    }}
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
