'use client';
import { Filters } from '@/components/main/map/filters/Filters';
import { FormSearch } from '@/components/main/map/filters/FormSearch';
import { ButtonOpenTasks } from '@/components/main/map/tasksPanel/ButtonOpenTasks';
import { TasksList } from '@/components/main/map/tasksPanel/TasksList';
import { AnimatedDrawler } from '@/components/ui/AnimatedDrawler';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';
import { useMapStore } from '@/zustand/stores/mapStore';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

type Props = {
  className?: string;
};
export const TasksOnMap = (props: Props) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { activePanel, setActivePanel } = useMapStore();

  const { noPaginatedTasks } = useFilteredTasksSelector();

  useClickOutside({
    ref: ref,
    callback: () => {
      if (activePanel) setActivePanel(null);
      console.log('Closing panel', activePanel);
    },
    options: {
      enabled: !!activePanel,
      detectEscapeKey: true,
    },
  });
  console.log('Checking if tablet', window.innerWidth, window.innerHeight);

  const useIsTablet = () => {
    const [isTablet, setIsTablet] = useState(false);
    useEffect(() => {
      console.log('Checking if tablet', window.innerWidth, window.innerHeight);

      const check = () => setIsTablet(window.innerWidth >= 768);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }, []);
    return isTablet;
  };

  const isTablet = useIsTablet();
  const dragTop = isTablet ? -250 : -180;

  return (
    <motion.div
      className={`${props.className} touch-none`}
      ref={ref}
      drag="y"
      dragConstraints={{ top: dragTop }}
      dragElastic={0.2}
      dragMomentum={false}
      animate={{ y: activePanel ? (isTablet ? -200 : -150) : 0 }}
      onDragStart={() => setActivePanel('tasks')}
      onDragEnd={(e, info) => {
        if (info.offset.y > 100) {
          setActivePanel(null);
        }
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className=" flex flex-col justify-center bg-card w-full rounded-sm lg:w-[485px]">
        <FormSearch
          className="p-0 bg-card border-b border-b-foreground"
          inputClassName="h-10 pl-7 pr-14 overflow-hidden"
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
      ${activePanel ? 'h-[354px] md:h-[400px]' : 'h-0'}
      lg:mt-0
      lg:w-[487px]
      lg:left-0 
   `}
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
              <Filters tasks={noPaginatedTasks} className="w-full bg-card" />
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
              <TasksList tasks={noPaginatedTasks} className="w-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatedDrawler>{' '}
    </motion.div>
  );
};
