// 'use client';

// import React, { useLayoutEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components';

// export const AboutAnimationTabs = ({
//   views,
//   activeView,
//   onChange,
// }: {
//   views: { view: string }[];
//   activeView: string;
//   onChange: (view: string) => void;
// }): React.JSX.Element => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [rect, setRect] = useState<{ left: number; width: number } | null>(
//     null
//   );

//   useLayoutEffect(() => {
//     if (!containerRef.current) return;
//     const container = containerRef.current;
//     const activeBtn = container.querySelector<HTMLButtonElement>(
//       `[data-view="${activeView}"]`
//     );
//     if (activeBtn) {
//       const { left, width } = activeBtn.getBoundingClientRect();
//       const containerLeft = container.getBoundingClientRect().left;
//       setRect({ left: left - containerLeft, width });
//     }
//   }, [activeView]);

//   return (
//     <div
//       className="relative inline-flex gap-[46px] mb-[25px]"
//       ref={containerRef}
//     >
//       {/* Animated border */}
//       {rect && (
//         <motion.div
//           layout
//           className="absolute top-0 left-0 h-full rounded-md border-2 border-primary pointer-events-none"
//           initial={false}
//           animate={{
//             x: rect.left,
//             width: rect.width,
//           }}
//           transition={{ type: 'spring', stiffness: 400, damping: 30 }}
//         />
//       )}
//       {views.map(({ view }) => (
//         <Button
//           variant="ghost"
//           size="sm"
//           key={view}
//           data-view={view}
//           onClick={() => onChange(view)}
//           className={`relative z-10 transition-colors duration-800 ${
//             activeView === view ? 'text-primary' : 'text-muted'
//           }`}
//         >
//           {view}
//         </Button>
//       ))}
//     </div>
//   );
// };

// 'use client';

// import React, { useLayoutEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components';

// export const AboutAnimationTabs = ({
//   views,
//   activeView,
//   onChange,
// }: {
//   views: { view: string }[];
//   activeView: string;
//   onChange: (view: string) => void;
// }): React.JSX.Element => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [rect, setRect] = useState<{ left: number; width: number } | null>(
//     null
//   );

//   useLayoutEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const activeBtn = container.querySelector(
//       `[data-view="${activeView}"]`
//     ) as HTMLElement;
//     if (activeBtn) {
//       // Прокрутка до активної кнопки, не викликаючи скрол сторінки
//       activeBtn.scrollIntoView({
//         behavior: 'smooth',
//         inline: 'center',
//         block: 'nearest',
//       });

//       const btnRect = activeBtn.getBoundingClientRect();
//       const containerRect = container.getBoundingClientRect();
//       const left = btnRect.left - containerRect.left + container.scrollLeft;
//       const width = btnRect.width;

//       setRect({ left, width });
//     }
//   }, [activeView]);

//   const handleClick = (view: string, e: React.MouseEvent) => {
//     e.preventDefault(); // запобігає стрибку сторінки
//     onChange(view);
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="relative flex gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap
//                  px-2 sm:justify-center scroll-smooth
//                  [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//     >
//       {/* Animated outline */}
//       {rect && (
//         <motion.div
//           layout
//           className="absolute top-0 left-0 h-full rounded-md border-2 border-primary pointer-events-none"
//           initial={false}
//           animate={{ left: rect.left, width: rect.width }}
//           transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//         />
//       )}

//       {views.map(({ view }) => (
//         <Button
//           key={view}
//           variant="ghost"
//           size="sm"
//           data-view={view}
//           onClick={(e) => handleClick(view, e)}
//           tabIndex={-1}
//           className={`relative z-10 px-4 py-2 rounded-md transition-colors ${
//             activeView === view ? 'text-primary' : 'text-muted'
//           }`}
//         >
//           {view}
//         </Button>
//       ))}
//     </div>
//   );
// };

'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components';

export const AboutAnimationTabs = ({
  views,
  activeView,
  onChange,
}: {
  views: { view: string }[];
  activeView: string;
  onChange: (view: string) => void;
}): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ left: number; width: number } | null>(
    null
  );

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const activeBtn = container.querySelector(
      `[data-view="${activeView}"]`
    ) as HTMLElement;
    if (activeBtn) {
      // Прокрутка до активної кнопки
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });

      // Обчислення обводки
      const btnRect = activeBtn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const left = btnRect.left - containerRect.left + container.scrollLeft;
      const width = btnRect.width;
      setRect({ left, width });
    }
  }, [activeView]);

  return (
    <div
      ref={containerRef}
      className="relative flex gap-4 mb-[25px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none]
             [&::-webkit-scrollbar]:hidden whitespace-nowrap scroll-smooth md:justify-start"
    >
      {rect && (
        <motion.div
          layout
          className="absolute top-0 left-0 h-full rounded-md border-2 border-primary pointer-events-none"
          initial={false}
          animate={{ left: rect.left, width: rect.width }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}

      {views.map(({ view }) => (
        <Button
          variant="ghost"
          size="sm"
          key={view}
          data-view={view}
          onClick={() => onChange(view)}
          className={`relative z-10 px-4 py-2 rounded-md transition-color duration-800 ${
            activeView === view ? 'text-primary' : 'text-muted'
          }`}
        >
          {view}
        </Button>
      ))}
    </div>
  );
};
