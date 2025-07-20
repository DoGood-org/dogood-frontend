// hooks/useScrollToActive.ts
import { TabScrollProps } from '@/types';
import { useLayoutEffect } from 'react';

export const useScrollToActive = ({
  containerRef,
  activeView,
  isTabletOrLarger,
  setRect,
  // isEnabled = true,
}: TabScrollProps): void => {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // if (!isEnabled) return;

    const activeBtn = container.querySelector(
      `[data-view="${activeView}"]`
    ) as HTMLElement;

    if (!activeBtn) return;

    const btnRect = activeBtn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const width = btnRect.width;

    let left: number;

    if (isTabletOrLarger) {
      left = btnRect.left - containerRect.left;
    } else {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });

      left = btnRect.left - containerRect.left + container.scrollLeft;
    }

    setRect({ left, width });
  }, [activeView, isTabletOrLarger, containerRef, setRect]);
};
